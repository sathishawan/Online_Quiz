package com.Registration.Registration.repository;

import com.Registration.Registration.models.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {

    Question findBy_id(Object _id);

    @Aggregation("{'$group':{_id :'$exam_name', total_Questions : {$sum : 1 }, total_marks : {$sum: '$mark'}}}")
    List<Question> countByQuestionsAndMarks();

    @Aggregation("{'$group':{_id :'$exam_name'}}")
    List<Question> userExamCount();

    @Aggregation(pipeline = {"{ $match : { exam_name : ?0 } }", "{ $sample : { size: 10 } }"})
    List<Question> userSelectExam(String exam_name);

    @Aggregation(value = "{'$group':{_id :'$exam_name'}}")
    List<Question> examlist();

//    @Query(value = "{'_id' : ?0}", fields = "{answer :1}")
//    List<Question> findAllById(String _id);

//    @Query("{exam_name : ?0, option_1 : ?1}")
//    List<Question> findExamCountByCategory(String exam_name, String option_1);

}
