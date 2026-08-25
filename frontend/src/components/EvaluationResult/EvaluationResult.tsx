import type {
    ResumeEvaluationResponse,
} from "../../types"

import ScoreCard from "./ScoreCard"
import SummaryCard from "./SummaryCard"
import ResultSection from "./ResultSection"

interface EvaluationResultProps {
    result: ResumeEvaluationResponse
}

const EvaluationResult = ({
                              result,
                          }: EvaluationResultProps) => {

    return (
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}

            <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-6 sm:px-8">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>

                        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                            AI Analysis
                        </p>

                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                            Resume Evaluation
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Here's how your resume aligns with the job description.
                        </p>

                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">

                        <span className="h-2 w-2 rounded-full bg-emerald-500" />

                        Completed

                    </div>

                </div>

            </div>

            {/* Content */}

            <div className="p-6 sm:p-8">

                <ScoreCard score={result.overallScore} />

                <SummaryCard summary={result.summary} />

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <ResultSection
                        title="Strengths"
                        items={result.strengths}
                        icon="✓"
                        variant="success"
                    />

                    <ResultSection
                        title="Matched Skills"
                        items={result.matchedSkills}
                        icon="✓"
                        variant="primary"
                    />

                    <ResultSection
                        title="Missing Skills"
                        items={result.missingSkills}
                        icon="!"
                        variant="warning"
                    />

                    <ResultSection
                        title="Recommendations"
                        items={result.recommendations}
                        icon="→"
                        variant="purple"
                    />

                </div>

            </div>

        </section>
    )
}

export default EvaluationResult