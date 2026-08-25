export interface ResumeEvaluationRequest {
    resumeText: string
    jobDescriptionText: string
}

export interface ResumeEvaluationResponse {
    overallScore: number
    summary: string
    strengths: string[]
    matchedSkills: string[]
    missingSkills: string[]
    recommendations: string[]
}