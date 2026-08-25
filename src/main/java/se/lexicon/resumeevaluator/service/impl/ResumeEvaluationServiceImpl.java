package se.lexicon.resumeevaluator.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.OpenAIService;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;
import se.lexicon.resumeevaluator.service.ResumeEvaluationValidator;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeEvaluationServiceImpl implements ResumeEvaluationService {

    private final OpenAIService openAIService;
    private final ResumeEvaluationValidator validator;

    @Override
    public ResumeEvaluationResponse evaluate(ResumeEvaluationRequest request) {

        // OpenAI response
        ResumeEvaluationResponse response = openAIService.evaluate(request);

        validator.validate(response);

        return response;
    }
}
