package se.lexicon.resumeevaluator.service;

import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;

public interface ResumeEvaluationService {
    ResumeEvaluationResponse evaluate(ResumeEvaluationRequest request);
}
