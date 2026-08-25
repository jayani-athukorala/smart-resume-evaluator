import type { ResumeInputMode } from "./EvaluationForm"

interface ResumeInputProps {
    mode: ResumeInputMode
    resumeText: string
    resumeFile: File | null

    onModeChange: (
        mode: ResumeInputMode
    ) => void

    onResumeTextChange: (
        value: string
    ) => void

    onResumeFileChange: (
        file: File | null
    ) => void
}

const ResumeInput = ({
                         mode,
                         resumeText,
                         resumeFile,
                         onModeChange,
                         onResumeTextChange,
                         onResumeFileChange,
                     }: ResumeInputProps) => {

    return (
        <section>

            <div className="mb-4 flex items-end justify-between">

                <div>

                    <h3 className="text-sm font-semibold text-slate-900">
                        Resume
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Choose how you'd like to provide your resume.
                    </p>

                </div>

                <span className="hidden text-xs text-slate-400 sm:block">
          Step 1 of 2
        </span>

            </div>

            {/* Mode selector */}

            <div className="grid grid-cols-2 gap-3">

                <button
                    type="button"
                    onClick={() => onModeChange("text")}
                    className={`rounded-xl border p-4 text-left transition ${
                        mode === "text"
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >

                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        📝
                    </div>

                    <div className="font-semibold text-slate-900">
                        Paste resume
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                        Paste your resume text
                    </div>

                </button>

                <button
                    type="button"
                    onClick={() => onModeChange("pdf")}
                    className={`rounded-xl border p-4 text-left transition ${
                        mode === "pdf"
                            ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >

                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        📄
                    </div>

                    <div className="font-semibold text-slate-900">
                        Upload PDF
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                        Upload a PDF up to 5 MB
                    </div>

                </button>

            </div>

            {/* Text input */}

            {mode === "text" && (

                <div className="mt-5">

                    <label
                        htmlFor="resume"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                        Paste your resume
                    </label>

                    <textarea
                        id="resume"
                        value={resumeText}
                        onChange={(event) =>
                            onResumeTextChange(event.target.value)
                        }
                        placeholder="Paste your resume here..."
                        rows={8}
                        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />

                </div>

            )}

            {/* PDF input */}

            {mode === "pdf" && (

                <div className="mt-5">

                    <label
                        htmlFor="resumeFile"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                        Upload your PDF resume
                    </label>

                    <label
                        htmlFor="resumeFile"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
                    >

                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                            📄
                        </div>

                        <p className="font-semibold text-slate-800">
                            {resumeFile
                                ? resumeFile.name
                                : "Choose a PDF resume"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Click to browse from your computer
                        </p>

                        <span className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              PDF · Max 5 MB
            </span>

                    </label>

                    <input
                        id="resumeFile"
                        type="file"
                        accept="application/pdf"
                        onChange={(event) => {

                            const file =
                                event.target.files?.[0] ?? null

                            onResumeFileChange(file)

                        }}
                        className="hidden"
                    />

                </div>

            )}

        </section>
    )
}

export default ResumeInput