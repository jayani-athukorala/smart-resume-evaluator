package se.lexicon.resumeevaluator.service.impl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationRequest;
import se.lexicon.resumeevaluator.dto.ResumeEvaluationResponse;
import se.lexicon.resumeevaluator.service.OpenAIService;

@Service
public class OpenAIServiceImpl implements OpenAIService {

    private final ChatClient chatClient;

    public OpenAIServiceImpl(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @Override
    public ResumeEvaluationResponse evaluate(
            ResumeEvaluationRequest request) {

        return chatClient
                .prompt()
                .system("""
                        You are a Senior Technical Recruiter
                        with 20 years of experience evaluating
                        software engineering candidates.

                        Your task is to objectively evaluate a
                        candidate's resume against a job description.

                        You must:

                        - Identify relevant strengths.
                        - Identify skills that match the job.
                        - Identify important missing skills.
                        - Provide practical recommendations.
                        - Assign an overall match score from 0 to 100.

                        Do not invent experience, skills, education,
                        certifications, or achievements.

                        Only use information explicitly present
                        in the resume.

                        If a required skill is not mentioned in the
                        resume, consider it missing.

                        Be objective and concise.
                        """)
                .user(user -> user
                        .text("""
                                Evaluate the following resume against
                                the following job description.

                                RESUME:
                                {resumeText}

                                JOB DESCRIPTION:
                                {jobDescriptionText}
                                """)
                        .param("resumeText", request.resumeText())
                        .param("jobDescriptionText", request.jobDescriptionText()))
                .call()
                .entity(
                        ResumeEvaluationResponse.class,
                        spec -> spec
                                .useProviderStructuredOutput()
                                .validateSchema()
                );
    }
}
