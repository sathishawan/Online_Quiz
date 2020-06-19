package com.Registration.Registration.repository;

import com.Registration.Registration.models.Question;
import com.Registration.Registration.models.Result;
import com.Registration.Registration.models.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ResultRepository extends MongoRepository<Result, String> {

    @Query(sort = "{ exam_date: -1}", fields = "{exam_name : 1, total_questions : 1, max_marks : 1, overall_score : 1,right_answer : 1, wrong_answer : 1, exam_date : 1}")
    List<Result> findBy_userid(String _userid);

    @Aggregation("{ $group : { _id : $_userid, total_results : { $sum : 1 } } }")
    List<Result> userResultCount();

    @Aggregation(pipeline = {"{ $match : { _userid : ?0 } }", "{ $count : total_results }"})
    List<Result> totalResultsForUser(String _userid);

}
