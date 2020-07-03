package com.Registration.Registration.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "rating")
public class Rating {
    @Id
    private String _id;

    private String user_id;

    private String user_name;

    private int rating_value;

    private String review;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="GMT")
    private Date created_date;

    public Rating(String user_id, String user_name, int rating_value, String review, Date created_date) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.rating_value = rating_value;
        this.review=review;
        this.created_date = created_date;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public int getRating_value() {
        return rating_value;
    }

    public void setRating_value(int rating_value) {
        this.rating_value = rating_value;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Date getCreated_date() {
        return created_date;
    }

    public void setCreated_date(Date created_date) {
        this.created_date = created_date;
    }
}
