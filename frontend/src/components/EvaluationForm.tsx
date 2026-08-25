import { useState } from "react"
import type { ResumeEvaluationResponse } from "../types"
import {evaluateResume, evaluateResumePdf, } from "../services/evaluationApi"

interface EvaluationFormProps {
    onResult: (result: ResumeEvaluationResponse) => void
    onError: (message: string) => void
    onLoading: (loading: boolean) => void
}

type ResumeInputMode = "text" | "pdf"

export default function EvaluationForm({onResult, onError, onLoading, }: EvaluationFormProps) {

    const [mode, setMode] = useState<ResumeInputMode>("text")

    const [resumeText, setResumeText] = useState("")
    const [resumeFile, setResumeFile] = useState<File | null>(null)

    const [jobDescriptionText, setJobDescriptionText] = useState("")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>
    ) {
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

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Resume input mode */}

            <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-800">Resume</h2>

                <div className="flex gap-3">

                    <button
                        type="button"
                        onClick={() => {
                            setMode("text")
                            setResumeFile(null)
                        }}
                        className={`rounded-lg px-4 py-2 font-medium transition ${
                            mode === "text" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}  >
                        Paste Resume
                    </button>

                    <button type="button"
                        onClick={() => {
                            setMode("pdf")
                            setResumeText("")
                        }}
                        className={`rounded-lg px-4 py-2 font-medium transition ${
                            mode === "pdf" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`} >
                        Upload PDF
                    </button>

                </div>
            </div>


            {/* Text resume */}
            {mode === "text" && (
                <div>

                    <label htmlFor="resume" className="mb-2 block text-sm font-semibold text-gray-700">
                        Paste your resume
                    </label>

                    <textarea
                        id="resume"
                        value={resumeText}
                        onChange={(event) =>
                            setResumeText(event.target.value)
                        }
                        placeholder="Paste your resume here..."
                        rows={6}
                        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-200"
                    />

                </div>
            )}


            {/* PDF resume */}

            {mode === "pdf" && (
                <div>

                    <label htmlFor="resumeFile" className="mb-2 block text-sm font-semibold text-gray-700">
                        Upload your PDF resume
                    </label>

                    <input id="resumeFile" type="file" accept="application/pdf"
                        onChange={(event) => {
                            const file = event.target.files?.[0] ?? null
                            setResumeFile(file)
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-700 shadow-sm"/>

                    {resumeFile && (
                        <p className="mt-2 text-sm text-gray-600">
                            Selected: {resumeFile.name}
                        </p>
                    )}

                    <p className="mt-2 text-xs text-gray-500">
                        PDF files only. Maximum size: 5 MB.
                    </p>

                </div>
            )}


            {/* Job description */}
            <div>
                <label htmlFor="jobDescription" className="mb-2 block text-sm font-semibold text-gray-700">
                    Job Description
                </label>

                <textarea id="jobDescription" value={jobDescriptionText} onChange={(event) =>
                        setJobDescriptionText(event.target.value)
                    }
                    placeholder="Paste the job description here..."
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-800 shadow-sm outline-none transition focus:ring-2 focus:ring-indigo-200"
                />

            </div>

            {/* Submit */}
            <button type="submit" className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Evaluate Resume
            </button>

        </form>
    )
}