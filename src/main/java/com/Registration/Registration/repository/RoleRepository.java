package com.Registration.Registration.repository;

import com.Registration.Registration.models.ERole;
import com.Registration.Registration.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByName(ERole name);

}
