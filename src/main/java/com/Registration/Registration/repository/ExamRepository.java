package com.Registration.Registration.repository;

import com.Registration.Registration.models.Exam;
import com.Registration.Registration.models.Question;
import com.Registration.Registration.models.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<Exam, String>, PagingAndSortingRepository<Exam, String> {

    Exam findBy_id(Object _id);

    @Query("{'$or' : [{ 'exam_id' : ?0}, {'exam_name' : ?1}]}")
    public List<Exam> findByExam_idAndExam_name(Object _id, Object _name);

    @Aggregation("{ '$lookup' :{from: 'questions', localField: 'exam_name',foreignField: 'exam_name', as: 'questions'}}")
    List<Exam> selectExam(String exam_name);
}
