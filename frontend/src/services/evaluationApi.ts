import type {
    ResumeEvaluationRequest,
    ResumeEvaluationResponse,
} from "../types"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export async function evaluateResume(
    request: ResumeEvaluationRequest
): Promise<ResumeEvaluationResponse> {

    const response = await fetch(
        `${API_URL}/api/v1/evaluations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        }
    )

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
            errorText || `Request failed with status ${response.status}`
        )
    }

    return response.json()
}


export async function evaluateResumePdf(
    file: File,
    jobDescriptionText: string
): Promise<ResumeEvaluationResponse> {

    const formData = new FormData()

    formData.append("resume", file)
    formData.append("jobDescription", jobDescriptionText)

    const response = await fetch(
        `${API_URL}/api/v1/evaluations/pdf`,
        {
            method: "POST",
            body: formData,
        }
    )

    if (!response.ok) {
        const errorText = await response.text()

        throw new Error(
            errorText || `Request failed with status ${response.status}`
        )
    }

    return response.json()
}