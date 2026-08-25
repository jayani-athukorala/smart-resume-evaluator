package se.lexicon.resumeevaluator.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ResumeEvaluationResponse(

        @Min(value = 0, message = "Overall score cannot be below 0")
        @Max(value = 100, message = "Overall score cannot exceed 100")
        int overallScore,

        @NotBlank(message = "Summary must not be blank")
        String summary,

        @NotNull(message = "Strengths must not be null")
        List<String> strengths,

        @NotNull(message = "Matched skills must not be null")
        List<String> matchedSkills,

        @NotNull(message = "Missing skills must not be null")
        List<String> missingSkills,

        @NotNull(message = "Recommendations must not be null")
        List<String> recommendations
) {}
