package se.lexicon.resumeevaluator.service.impl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.OpenAIService;
import se.lexicon.resumeevaluator.service.ResumeEvaluationValidator;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResumeEvaluationServiceImplTest {

    @Mock
    private OpenAIService openAIService;

    @Mock
    private ResumeEvaluationValidator validator;

    @InjectMocks
    private ResumeEvaluationServiceImpl service;

    @Test
    void shouldEvaluateResume() {

        ResumeEvaluationRequest request =
                new ResumeEvaluationRequest(
                        "Java developer with Spring Boot experience",
                        "Java developer with Spring Boot and AWS"
                );

        ResumeEvaluationResponse expected =
                new ResumeEvaluationResponse(
                        75,
                        "Strong match with some missing skills.",
                        List.of("Java", "Spring Boot"),
                        List.of("Java", "Spring Boot"),
                        List.of("AWS"),
                        List.of("Gain AWS experience")
                );

        when(openAIService.evaluate(request))
                .thenReturn(expected);

        ResumeEvaluationResponse actual =
                service.evaluate(request);

        assertThat(actual)
                .isEqualTo(expected);

        verify(openAIService)
                .evaluate(request);

        verify(validator)
                .validate(expected);
    }

    @Test
    void shouldPropagateValidationFailure() {

        ResumeEvaluationRequest request =
                new ResumeEvaluationRequest(
                        "Java developer",
                        "Senior Java developer"
                );

        ResumeEvaluationResponse response =
                new ResumeEvaluationResponse(
                        75,
                        "Test evaluation",
                        List.of("Java"),
                        List.of("Java"),
                        List.of(),
                        List.of()
                );

        when(openAIService.evaluate(request))
                .thenReturn(response);

        doThrow(new IllegalStateException(
                "AI evaluation failed validation"
        ))
                .when(validator)
                .validate(response);

        org.assertj.core.api.Assertions.assertThatThrownBy(
                        () -> service.evaluate(request)
                )
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining(
                        "AI evaluation failed validation"
                );

        verify(openAIService).evaluate(request);
        verify(validator).validate(response);
    }

}
