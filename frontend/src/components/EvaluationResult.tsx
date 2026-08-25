import type { ResumeEvaluationResponse } from "../types"

interface EvaluationResultProps {
    result: ResumeEvaluationResponse
}

interface SectionProps {
    title: string
    items: string[]
}

function ResultSection({title, items, }: SectionProps) {

    return (
        <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
                {title}
            </h3>

            {items.length === 0 ? (
                <p className="text-gray-500">
                    None identified.
                </p>
            ) : (
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="rounded-lg bg-gray-50 p-3 text-gray-700"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default function EvaluationResult({
                                             result,
                                         }: EvaluationResultProps) {

    return (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">

            <div className="mb-8 text-center">

                <h2 className="mb-4 text-2xl font-bold text-gray-900">
                    Evaluation Result
                </h2>

                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-indigo-500">
                    <div>
                        <div className="text-4xl font-bold text-indigo-600">
                            {result.overallScore}
                        </div>

                        <div className="text-sm text-gray-500">
                            / 100
                        </div>
                    </div>
                </div>

            </div>

            <div className="mb-8 rounded-lg bg-gray-50 p-5">

                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    Summary
                </h3>

                <p className="leading-7 text-gray-700">
                    {result.summary}
                </p>

            </div>

            <div className="grid gap-8 md:grid-cols-2">

                <ResultSection
                    title="Strengths"
                    items={result.strengths}
                />

                <ResultSection
                    title="Matched Skills"
                    items={result.matchedSkills}
                />

                <ResultSection
                    title="Missing Skills"
                    items={result.missingSkills}
                />

                <ResultSection
                    title="Recommendations"
                    items={result.recommendations}
                />

            </div>

        </div>
    )
}