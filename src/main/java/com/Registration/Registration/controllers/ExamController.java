package com.Registration.Registration.controllers;

import com.Registration.Registration.models.Exam;
import com.Registration.Registration.repository.ExamRepository;
import com.Registration.Registration.repository.QuestionRepository;
import com.Registration.Registration.response.MessageResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ExamController {

    @Autowired
    ExamRepository examRepository;

    @Autowired
    QuestionRepository questionRepository;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/exam/add", method = RequestMethod.POST)
    public ResponseEntity<?> adminExamAdd(@Valid @RequestBody Exam exam) {
        exam.set_id(ObjectId.get().toHexString());

        if (exam.getExam_id() != "" && exam.getExam_name() != "")
        {
            List<Exam> existExamData = examRepository.findByExam_idAndExam_name(exam.getExam_id(), exam.getExam_name());

            if (existExamData.size() == 0)
            {
                examRepository.save(exam);
                return ResponseEntity
                        .ok()
                        .body(new MessageResponse("success: Added Successfully!"));
            }
            else
            {
                // return existExamData.get(0);
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Exam is already taken!"));
            }
        }
        return null;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/exam/list", method = RequestMethod.GET)
    public List<Exam> adminExamList() {
        return examRepository.findAll(Sort.by(Sort.Direction.DESC, "created_date"));
    }

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/admin/exam/list", method = RequestMethod.GET)
//    public Map<String, Object> adminIndex()
//    {
//        Map<String, Object> items = new HashMap();
//        items.put("exam", examRepository.findAll(Sort.by(Sort.Direction.DESC, "exam_name")));
//        items.put("question", questionRepository.countByQuestionsAndMarks(Sort.by(Sort.Direction.DESC, "_id")));
//        return items;
//    }

    @CrossOrigin(origins = "*")
    @RequestMapping( value="/admin/exam/edit/{_id}",method= RequestMethod.PUT)
    public Exam adminExamEdit(@PathVariable String _id, @RequestBody Exam exam) {
        Optional<Exam> opemployee = examRepository.findById(_id);
        Exam e = opemployee.get();
        if(exam.getExam_id() != null)
            e.setExam_id(exam.getExam_id());
        if(exam.getExam_name() != null)
            e.setExam_name(exam.getExam_name());
        if(exam.getExam_date() != null)
            e.setExam_date(exam.getExam_date());
        if(exam.getExam_time() != null)
            e.setExam_time(exam.getExam_time());
        if(exam.getDuration() != null)
            e.setDuration(exam.getDuration());
        examRepository.save(e);
        return e;
    }

    @CrossOrigin(origins="*")
    @RequestMapping(value = "admin/exam/edit/{_id}", method = RequestMethod.GET)
    public Exam adminExamEditById(@PathVariable("_id") String _id) {
        return examRepository.findBy_id(_id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/admin/exam/delete/{id}")
    public void adminExamDelete(@PathVariable  String id) {
        examRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/examCount", method = RequestMethod.GET)
    public long adminExamCount() {
        return examRepository.count();
    }

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/user/examCount", method = RequestMethod.GET)
//    public List<Exam> userExamCount() {
//        return examRepository.userExamCount();
//    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_exam", method = RequestMethod.GET)
    public List<Exam> get_exam() {
        return examRepository.findAll();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "select/exam", method = RequestMethod.GET)
    public List<Exam> selectExam(@RequestParam String exam_name) {
        return examRepository.selectExam(exam_name);
    }

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/exam_list", method = RequestMethod.GET)
//    public List<Exam> exam_list() {
//        return examRepository.questionMatchWithExam();
//    }

}
