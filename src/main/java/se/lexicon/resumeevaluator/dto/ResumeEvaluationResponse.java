package se.lexicon.resumeevaluator.dto;

import java.util.List;

public record ResumeEvaluationResponse(
        int overallScore,
        String summary,
        List<String> strengths,
        List<String> matchedSkills,
        List<String> missingSkills,
        List<String> recommendations
) {}
