package com.Registration.Registration.controllers;

import com.Registration.Registration.models.Question;
import com.Registration.Registration.repository.QuestionRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class QuestionController<exam_name> {

    @Autowired
    QuestionRepository questionRepository;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/question/add", method = RequestMethod.POST)
    public @Valid Question adminQuestionAdd(@Valid @RequestBody Question question) {
        question.set_id(ObjectId.get().toHexString());
        questionRepository.save(question);
        return question;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/question/list", method = RequestMethod.GET)
    public List<Question> adminQuestionList() {
        return questionRepository.findAll(Sort.by(Sort.Direction.DESC, "created_date"));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/question/edit/{_id}", method = RequestMethod.PUT)
    public Question adminQuestionEdit(@PathVariable String _id, @RequestBody Question question) {
        Optional<Question> opemployee = questionRepository.findById(_id);
        Question e = opemployee.get();
        if (question.getExam_name() != null)
            e.setExam_name(question.getExam_name());
        if (question.getQuestion() != null)
            e.setQuestion(question.getQuestion());
        if (question.getOption_1() != null)
            e.setOption_1(question.getOption_1());
        if (question.getOption_2() != null)
            e.setOption_2(question.getOption_2());
        if (question.getOption_3() != null)
            e.setOption_3(question.getOption_3());
        if (question.getOption_4() != null)
            e.setOption_4(question.getOption_4());
        if (question.getAnswer() != null)
            e.setAnswer(question.getAnswer());
        if (question.getMark() != 0)
            e.setMark(question.getMark());

        questionRepository.save(e);
        return e;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "admin/question/edit/{_id}", method = RequestMethod.GET)
    public Question adminQuestionEditById(@PathVariable("_id") String _id) {
        return questionRepository.findBy_id(_id);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/admin/question/delete/{id}")
    public void adminQuestionDelete(@PathVariable String id) {
        questionRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/questionCount", method = RequestMethod.GET)
    public long adminQuestionCount() {
        return questionRepository.count();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/countByQuestionsAndMarks", method = RequestMethod.GET)
    public List<Question> countByQuestionsAndMarks() {
        return questionRepository.countByQuestionsAndMarks();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/examCount", method = RequestMethod.GET)
    public List<Question> userExamCount() {
        return questionRepository.userExamCount();
    }

//    @CrossOrigin(origins = "*")
////    @RequestMapping(value = "/question/list", method = RequestMethod.GET)
////    public List<Question> QuestionList(@RequestParam String _id) {
////        return questionRepository.findAllById(_id);
////    }

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/totalmarksByQuestions", method = RequestMethod.GET)
//    public List<Question> totalmarksGroubByexam_name( ) {
//        return questionRepository.totalmarksGroubByexam_name();
//    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/select/exam", method = RequestMethod.GET)
    public List<Question> userSelectExam(@RequestParam String exam_name) {
        return questionRepository.userSelectExam(exam_name);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/examlist", method = RequestMethod.GET)
    public List<Question> questionList() {
        return questionRepository.examlist();
    }

}
