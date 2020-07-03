package com.Registration.Registration.repository;

import com.Registration.Registration.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findById(String id);

    @Query(fields = "{username: 1, email: 1, id: 0}")
    List<User> findByid(String id);

    User findByToken(String token);

    @Query(value = "{'email' : { $regex : ?0, $options: 'i' } }")
    User findByEmailIgnoreCase(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);
}
