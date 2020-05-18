package com.Registration.Registration.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import java.util.Date;

@Document(collection = "questions")
public class Question {

    @Id
    private String _id;

    @NotBlank
    private String exam_name;

    @NotBlank
    private String question;

    @NotBlank
    private  String option_1;

    @NotBlank
    private  String option_2;

    @NotBlank
    private  String option_3;

    @NotBlank
    private  String option_4;

    @NotBlank
    private  String answer;

    private  Integer mark;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT")
    private Date created_date;

    private Integer total_Questions;

    private  Integer total_marks;

    public Question(@NotBlank String exam_name, @NotBlank String question, @NotBlank String option_1, @NotBlank String option_2, @NotBlank String option_3, @NotBlank String option_4, @NotBlank String answer, Integer mark) {
        this.exam_name = exam_name;
        this.question = question;
        this.option_1 = option_1;
        this.option_2 = option_2;
        this.option_3 = option_3;
        this.option_4 = option_4;
        this.answer = answer;
        this.mark = mark;
        this.created_date = new Date();
    }

    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getExam_name() {
        return this.exam_name;
    }

    public void setExam_name(String exam_name) {
        this.exam_name = exam_name;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOption_1() {
        return option_1;
    }

    public void setOption_1(String option_1) {
        this.option_1 = option_1;
    }

    public String getOption_2() {
        return option_2;
    }

    public void setOption_2(String option_2) {
        this.option_2 = option_2;
    }

    public String getOption_3() {
        return option_3;
    }

    public void setOption_3(String option_3) {
        this.option_3 = option_3;
    }

    public String getOption_4() {
        return option_4;
    }

    public void setOption_4(String option_4) {
        this.option_4 = option_4;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getMark() {
        return mark;
    }

    public void setMark(Integer mark) {
        this.mark = mark;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public Integer getTotal_Questions() {
        return total_Questions;
    }

    public void setTotal_Questions(Integer total_Questions) {
        this.total_Questions = total_Questions;
    }

    public Integer getTotal_marks() {
        return total_marks;
    }

    public void setTotal_marks(Integer total_marks) {
        this.total_marks = total_marks;
    }
}
