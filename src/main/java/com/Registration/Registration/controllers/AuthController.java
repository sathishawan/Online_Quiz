package com.Registration.Registration.controllers;

import com.Registration.Registration.models.*;
import com.Registration.Registration.repository.*;
import com.Registration.Registration.request.LoginRequest;
import com.Registration.Registration.request.SignupRequest;
import com.Registration.Registration.response.JwtResponse;
import com.Registration.Registration.response.MessageResponse;
import com.Registration.Registration.security.jwt.JwtUtils;
import com.Registration.Registration.security.services.UserDetailsImpl;
import com.Registration.Registration.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public JavaMailSender javaMailSender;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken

                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if (userRepository.existsByPhone(signUpRequest.getPhone())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Phone is already in use!"));
        }
        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),signUpRequest.getPhone(),signUpRequest.getBirth() ,signUpRequest.getToken(),signUpRequest.getTokenCreationDate());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
//                    case "user":
//                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//                        roles.add(userRole);
//
//                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/getById", method = RequestMethod.GET)
    public Optional<User> userGetById(@RequestParam String id) {
        return userRepository.findById(id);
    }

    @RequestMapping( value="/user/editById/{id}",method= RequestMethod.PUT)
    public ResponseEntity<?> userEditById(@Valid @PathVariable String id, @RequestBody User signUpRequest) {

        Optional<User> employee = userRepository.findById(id);
        if (!employee.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User e = employee.get();

        if (userRepository.existsByUsername(signUpRequest.getUsername()) && !e.getUsername().equals(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail()) && !e.getEmail().equals(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if (userRepository.existsByPhone(signUpRequest.getPhone()) && !e.getPhone().equals(signUpRequest.getPhone())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Phone is already in use!"));
        }

        if (signUpRequest.getUsername() != null)
            e.setUsername(signUpRequest.getUsername());
        if (signUpRequest.getEmail() != null)
            e.setEmail(signUpRequest.getEmail());
        if (signUpRequest.getPhone() != null)
            e.setPhone(signUpRequest.getPhone());
        if (signUpRequest.getBirth() != null)
            e.setBirth(signUpRequest.getBirth());
        userRepository.save(e);
        return ResponseEntity.ok(new MessageResponse("Profile Updated successfully!"));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {
        User existingUser = userRepository.findByEmailIgnoreCase(email);

        String response = userService.forgotPassword(email);

        if (!response.startsWith("Invalid")) {
            SimpleMailMessage message=new SimpleMailMessage();
            message.setTo(existingUser.getEmail());
            message.setSubject("Reset Password");
            message.setText("To complete the password reset process,please click below link :\n\n" + "http://localhost:3000/user/reset_password?token=" + response);
            javaMailSender.send(message);
        }
        return response;
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/reset-password")
    public String resetPassword(@RequestParam String token,@RequestParam String password) {
        return userService.resetPassword(token, encoder.encode(password));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_roles", method = RequestMethod.GET)
    public List<Role> get_roles() {
        return roleRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/user/list", method = RequestMethod.GET)
    public List<User> adminUserList() {
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/list/userById", method = RequestMethod.GET)
    public List<User> listUserById(@RequestParam String id) {
        return userRepository.findByid(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/userCount", method = RequestMethod.GET)
    public long adminUserCount() {
        return userRepository.count();
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/admin/user/delete/{id}")
    public void adminUserDelete(@PathVariable  String id) {
        userRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/rating", method = RequestMethod.POST)
    public @Valid Rating add(@Valid @RequestBody Rating rating) {
        rating.set_id(ObjectId.get().toHexString());
        ratingRepository.save(rating);

        return rating;
    }

}
