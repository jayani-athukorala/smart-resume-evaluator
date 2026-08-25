package se.lexicon.resumeevaluator.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;

import java.awt.*;

@RestController
@RequestMapping("/api/v1/evaluations")
@RequiredArgsConstructor
public class ResumeEvaluationController {

    private final ResumeEvaluationService evaluationService;

    @PostMapping
    public ResumeEvaluationResponse evaluate(@Valid @RequestBody ResumeEvaluationRequest request){

        return evaluationService.evaluate(request);
    }

}
