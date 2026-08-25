package se.lexicon.resumeevaluator.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import se.lexicon.resumeevaluator.document.ResumeDocumentService;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;

import java.awt.*;

@RestController
@RequestMapping("/api/v1/evaluations")
@RequiredArgsConstructor
public class ResumeEvaluationController {

    private final ResumeEvaluationService evaluationService;
    private final ResumeDocumentService resumeDocumentService;

    @PostMapping
    public ResumeEvaluationResponse evaluate(@Valid @RequestBody ResumeEvaluationRequest request){

        return evaluationService.evaluate(request);
    }

    @PostMapping(value = "/pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResumeEvaluationResponse evaluatePdf(
            @RequestPart("resume") MultipartFile resume,
            @RequestPart("jobDescription") String jobDescriptionText) {

        String resumeText = resumeDocumentService.extractAndRedact(resume);

        ResumeEvaluationRequest request = new ResumeEvaluationRequest(resumeText, jobDescriptionText);

        return evaluationService.evaluate(request);
    }

}
