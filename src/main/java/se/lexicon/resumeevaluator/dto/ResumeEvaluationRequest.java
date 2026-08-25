package se.lexicon.resumeevaluator.dto;

import jakarta.validation.constraints.NotBlank;

public record ResumeEvaluationRequest(
        @NotBlank(message = "Resume text must not be blank")
        String resumeText,

        @NotBlank(message = "Job description text must not be blank")
        String jobDescriptionText
) {}
