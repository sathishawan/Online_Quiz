package com.Registration.Registration.controllers;

import com.Registration.Registration.models.Exam;
import com.Registration.Registration.repository.*;
import com.Registration.Registration.response.MessageResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class DashboardController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ExamRepository examRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    ResultRepository resultRepository;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/adminIndex", method = RequestMethod.GET)
    public Map<String, Long> adminIndex()
    {
        Map<String, Long> myMap = new HashMap<String, Long>();
        myMap.put("exam", examRepository.count());
        myMap.put("question", questionRepository.count());
        myMap.put("user", userRepository.count());
        myMap.put("result", resultRepository.count());
        return myMap;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/userIndex", method = RequestMethod.GET)
    public List<Exam> userIndex()
    {
        return null;
    }

}
