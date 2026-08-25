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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.awt.*;

@RestController
@RequestMapping("/api/v1/evaluations")
@RequiredArgsConstructor
@Tag(
        name = "Resume Evaluations",
        description = "AI-powered resume evaluation endpoints"
)
public class ResumeEvaluationController {

    private final ResumeEvaluationService evaluationService;
    private final ResumeDocumentService resumeDocumentService;

    @Operation(
            summary = "Evaluate a resume",
            description = """
                Evaluates a resume against a job description
                using an AI-powered technical recruiter.
                """
    )
    @PostMapping
    public ResumeEvaluationResponse evaluate(@Valid @RequestBody ResumeEvaluationRequest request){

        return evaluationService.evaluate(request);
    }

    @Operation(
            summary = "Evaluate a PDF resume",
            description = """
                Extracts text from a PDF resume, redacts
                supported personally identifiable information,
                and evaluates the resume against the job description.
                """
    )
    @PostMapping(value = "/pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResumeEvaluationResponse evaluatePdf(
            @RequestPart("resume") MultipartFile resume,
            @RequestPart("jobDescription") String jobDescriptionText) {

        String resumeText = resumeDocumentService.extractAndRedact(resume);

        ResumeEvaluationRequest request = new ResumeEvaluationRequest(resumeText, jobDescriptionText);

        return evaluationService.evaluate(request);
    }

}
