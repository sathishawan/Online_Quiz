package com.Registration.Registration.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection="results")
public class Result {

    @Id
    private String _id;

    private String _userid;

    private String user_name;

    private String exam_name;

    private Integer total_questions;

    private Integer max_marks;

    private Integer right_answer;

    private Integer wrong_answer;

    private Float overall_score;

    private Integer not_answer;

    private  Float percentage;

    private String Status;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT")
    private Date exam_date;

    private Integer total_results;

    public Result(String _userid, String user_name, String exam_name, Integer total_questions, Integer max_marks, Integer right_answer, Integer wrong_answer, Float overall_score, Integer not_answer, Float percentage, String Status, Date exam_date) {
        this._userid = _userid;
        this.user_name = user_name;
        this.exam_name = exam_name;
        this.total_questions = total_questions;
        this.max_marks = max_marks;
        this.right_answer = right_answer;
        this.wrong_answer = wrong_answer;
        this.overall_score = overall_score;
        this.not_answer = not_answer;
        this.percentage = percentage;
        this.Status = Status;
        this.exam_date = exam_date;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_userid() {
        return _userid;
    }

    public void set_userid(String _userid) {
        this._userid = _userid;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getExam_name() {
        return exam_name;
    }

    public void setExam_name(String exam_name) {
        this.exam_name = exam_name;
    }

    public Integer getTotal_questions() {
        return total_questions;
    }

    public void setTotal_questions(Integer total_questions) {
        this.total_questions = total_questions;
    }

    public Integer getMax_marks() {
        return max_marks;
    }

    public void setMax_marks(Integer max_marks) {
        this.max_marks = max_marks;
    }

    public Integer getRight_answer() {
        return right_answer;
    }

    public void setRight_answer(Integer right_answer) {
        this.right_answer = right_answer;
    }

    public Integer getWrong_answer() {
        return wrong_answer;
    }

    public void setWrong_answer(Integer wrong_answer) {
        this.wrong_answer = wrong_answer;
    }

    public Float getOverall_score() {
        return overall_score;
    }

    public void setOverall_score(Float overall_score) {
        this.overall_score = overall_score;
    }

    public Integer getNot_answer() {
        return not_answer;
    }

    public void setNot_answer(Integer not_answer) {
        this.not_answer = not_answer;
    }

    public Float getPercentage() {
        return percentage;
    }

    public void setPercentage(Float percentage) {
        this.percentage = percentage;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public Date getExam_date() {
        return exam_date;
    }

    public void setExam_date(Date exam_date) {
        this.exam_date = exam_date;
    }

    public Integer getTotal_results() {
        return total_results;
    }

    public void setTotal_results(Integer total_results) {
        this.total_results = total_results;
    }
}
