package com.Registration.Registration.controllers;

import com.Registration.Registration.models.Result;
import com.Registration.Registration.repository.ResultRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ResultController {

    @Autowired
    ResultRepository resultRepository;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/answer", method = RequestMethod.POST)
    public @Valid Result add(@Valid @RequestBody Result result) {
        result.set_id(ObjectId.get().toHexString());
        resultRepository.save(result);
        return result;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/result/list", method = RequestMethod.GET)
    public List<Result> adminResultList() {
        return resultRepository.findAll(Sort.by(Sort.Direction.DESC, "exam_date"));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/findById", method = RequestMethod.GET)
    public List<Result> userfindById(@RequestParam String _userid) {
        return resultRepository.findBy_userid(_userid);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/resultCount", method = RequestMethod.GET)
    public List<Result> userResultCount() {
        return resultRepository.userResultCount();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/totalresultsForUser", method = RequestMethod.GET)
    public List<Result> totalResultsForUser(@RequestParam String _userid) {
        return resultRepository.totalResultsForUser(_userid);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/admin/result/delete/{id}")
    public void adminResultDelete(@PathVariable String id) {
        resultRepository.deleteById(id);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/admin/resultCount", method = RequestMethod.GET)
    public long adminResultCount() {
        return resultRepository.count();
    }


}
