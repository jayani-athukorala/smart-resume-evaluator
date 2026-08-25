package se.lexicon.resumeevaluator.service.impl;

import org.springframework.stereotype.Service;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;

import java.util.List;

@Service
public class ResumeEvaluationServiceImpl implements ResumeEvaluationService {

    @Override
    public ResumeEvaluationResponse evaluate(ResumeEvaluationRequest request) {

        // Temporary response
        return new ResumeEvaluationResponse(
                75,
                "This is a temporary evaluation response.",
                List.of(
                        "Java experience",
                        "Backend development experience"
                ),
                List.of(
                        "Java",
                        "Spring Boot"
                ),
                List.of(
                        "Kubernetes",
                        "AWS"
                ),
                List.of(
                        "Highlight relevant cloud experience",
                        "Add measurable achievements to the resume"
                )
        );
    }
}
