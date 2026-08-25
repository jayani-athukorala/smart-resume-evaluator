package se.lexicon.resumeevaluator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import se.lexicon.resumeevaluator.document.ResumeDocumentService;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.ResumeEvaluationService;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ResumeEvaluationController.class)
class ResumeEvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @MockitoBean
    private ResumeEvaluationService evaluationService;

    @MockitoBean
    private ResumeDocumentService documentService;

    @Test
    void shouldEvaluateResume() throws Exception {

        ResumeEvaluationRequest request = new ResumeEvaluationRequest(
                "Senior Java developer with 5 years of experience.",
                "Looking for Java and Spring Boot experience."
        );

        ResumeEvaluationResponse response = new ResumeEvaluationResponse(
                85,
                "Strong match for the position.",
                List.of("Java experience", "Spring Boot experience"),
                List.of("Java", "Spring Boot"),
                List.of("AWS"),
                List.of("Gain AWS experience")
        );

        when(evaluationService.evaluate(any(ResumeEvaluationRequest.class)))
                .thenReturn(response);

        mockMvc.perform(
                        post("/api/v1/evaluations")
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.overallScore").value(85))
                .andExpect(jsonPath("$.summary").value("Strong match for the position."));
    }

    @Test
    void shouldRejectBlankResume() throws Exception {

        ResumeEvaluationRequest request = new ResumeEvaluationRequest(
                "",
                "Looking for Java developer."
        );

        mockMvc.perform(
                        post("/api/v1/evaluations")
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldRejectBlankJobDescription() throws Exception {

        ResumeEvaluationRequest request = new ResumeEvaluationRequest(
                "Senior Java developer.",
                ""
        );

        mockMvc.perform(
                        post("/api/v1/evaluations")
                                .contentType(APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request))
                )
                .andExpect(status().isBadRequest());
    }
}