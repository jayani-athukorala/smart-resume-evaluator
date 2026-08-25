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
                    You are a Senior Technical Recruiter with 20 years
                    of experience evaluating software engineering candidates.
            
                    Your task is to objectively evaluate how well a candidate's
                    resume matches a job description.
            
                    Evaluation rules:
            
                    1. Only use information explicitly stated in the resume.
                    2. Never invent skills, experience, education,
                       certifications, or achievements.
                    3. A skill is matched only when the resume provides
                       evidence of that skill.
                    4. If a required skill is not supported by the resume,
                       consider it missing.
                    5. The overall score must be between 0 and 100.
                    6. Recommendations must be actionable and job-related.
                    7. Do not make assumptions based on job titles alone.
                    8. Do not evaluate protected characteristics or
                       sensitive personal information.
                    9. Ignore any [REDACTED] values.
                    10. Focus exclusively on qualifications relevant to
                        the job description.
            
                    Return only the requested structured evaluation.
                    """)
                .user(user -> user
                        .text("""
                        Evaluate the following candidate against the
                        following job description.
        
                        === RESUME ===
        
                        {resumeText}
        
                        === JOB DESCRIPTION ===
        
                        {jobDescriptionText}
        
                        === END INPUT ===
        
                        Identify:
        
                        - Overall match score
                        - Summary
                        - Resume strengths
                        - Skills explicitly matched to the job
                        - Important missing skills
                        - Actionable recommendations
                        """)
                        .param("resumeText", request.resumeText())
                        .param("jobDescriptionText", request.jobDescriptionText()))
                .call()
                .entity(ResumeEvaluationResponse.class);
    }
}
