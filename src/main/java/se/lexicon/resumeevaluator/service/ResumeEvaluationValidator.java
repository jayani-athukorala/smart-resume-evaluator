package se.lexicon.resumeevaluator.service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ResumeEvaluationValidator {

    private final Validator validator;

    public void validate(ResumeEvaluationResponse response) {

        Set<ConstraintViolation<ResumeEvaluationResponse>> violations = validator.validate(response);

        if (!violations.isEmpty()) {

            String message = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));

            throw new IllegalStateException("AI evaluation failed validation: " + message);
        }
    }
}