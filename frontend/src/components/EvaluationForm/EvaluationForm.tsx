import type { ResumeEvaluationResponse } from "../../types"

import {
    evaluateResume,
    evaluateResumePdf,
} from "../../services/evaluationApi"

import ResumeInput from "./ResumeInput"
import JobDescriptionInput from "./JobDescriptionInput"
import {useState} from "react";

interface EvaluationFormProps {
    onResult: (result: ResumeEvaluationResponse) => void
    onError: (message: string) => void
    onLoading: (loading: boolean) => void
}

export type ResumeInputMode = "text" | "pdf"

const EvaluationForm = ({
                            onResult,
                            onError,
                            onLoading,
                        }: EvaluationFormProps) => {

    const [mode, setMode] =
        useState<ResumeInputMode>("text")

    const [resumeText, setResumeText] =
        useState("")

    const [resumeFile, setResumeFile] =
        useState<File | null>(null)

    const [jobDescriptionText, setJobDescriptionText] =
        useState("")

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault()

        if (!jobDescriptionText.trim()) {
            onError("Please enter the job description.")
            return
        }

        if (mode === "text" && !resumeText.trim()) {
            onError("Please paste your resume.")
            return
        }

        if (mode === "pdf" && !resumeFile) {
            onError("Please select a PDF resume.")
            return
        }

        try {

            onError("")
            onLoading(true)

            let result: ResumeEvaluationResponse

            if (mode === "text") {

                result = await evaluateResume({
                    resumeText,
                    jobDescriptionText,
                })

            } else {

                result = await evaluateResumePdf(
                    resumeFile!,
                    jobDescriptionText
                )

            }

            onResult(result)

        } catch (error) {

            if (error instanceof Error) {
                onError(error.message)
            } else {
                onError(
                    "Something went wrong while evaluating the resume."
                )
            }

        } finally {

            onLoading(false)

        }
    }

    const handleModeChange = (newMode: ResumeInputMode) => {

        setMode(newMode)

        if (newMode === "text") {
            setResumeFile(null)
        } else {
            setResumeText("")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            <ResumeInput
                mode={mode}
                resumeText={resumeText}
                resumeFile={resumeFile}
                onModeChange={handleModeChange}
                onResumeTextChange={setResumeText}
                onResumeFileChange={setResumeFile}
            />

            <JobDescriptionInput
                value={jobDescriptionText}
                onChange={setJobDescriptionText}
            />

            <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            >
                Evaluate Resume

                <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
            </button>

        </form>
    )
}

export default EvaluationForm