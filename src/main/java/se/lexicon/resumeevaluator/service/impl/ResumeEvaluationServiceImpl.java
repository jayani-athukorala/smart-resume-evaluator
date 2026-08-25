package se.lexicon.resumeevaluator.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.OpenAIService;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;
import se.lexicon.resumeevaluator.service.ResumeEvaluationValidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class ResumeEvaluationServiceImpl implements ResumeEvaluationService {

    private final OpenAIService openAIService;
    private final ResumeEvaluationValidator validator;
    private static final Logger log = LoggerFactory.getLogger(ResumeEvaluationServiceImpl.class);

    @Override
    public ResumeEvaluationResponse evaluate(ResumeEvaluationRequest request) {

        log.info("Starting resume evaluation");

        ResumeEvaluationResponse response = openAIService.evaluate(request);

        validator.validate(response);

        log.info("Resume evaluation completed with score {}", response.overallScore());

        return response;
    }
}
