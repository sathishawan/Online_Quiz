package com.Registration.Registration.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Document(collection = "exam")
public class Exam {

    @Id
    private String _id;

    @NotBlank
    @Size(max = 10)
    private String exam_id;

    @NotBlank
    @Size(max = 30)
    private String exam_name;

    @NotBlank
    private String exam_date;

    @NotBlank
    private String exam_time;

    @NotBlank
    private String duration;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT")
    private Date created_date;

    private List<Question> questions;

    public Exam(@Size(max = 10) String exam_id, @Size(max = 30) String exam_name, String duration, String exam_time, String exam_date) {
        this.exam_id = exam_id;
        this.exam_name = exam_name;
        this.duration = duration;
        this.exam_time = exam_time;
        this.exam_date = exam_date;
        this.created_date = new Date();
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getExam_id() {
        return exam_id;
    }

    public void setExam_id(String exam_id) {
        this.exam_id = exam_id;
    }

    public String getExam_name() {
        return exam_name;
    }

    public void setExam_name(String exam_name) {
        this.exam_name = exam_name;
    }

    public String getExam_date() {
        return exam_date;
    }

    public void setExam_date(String exam_date) {
        this.exam_date = exam_date;
    }

    public String getExam_time() {
        return exam_time;
    }

    public void setExam_time(String exam_time) {
        this.exam_time = exam_time;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
