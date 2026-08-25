package se.lexicon.resumeevaluator.dto;

public record ResumeEvaluationRequest(
        String resumeText,
        String jobDescriptionText
) {}
