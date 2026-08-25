interface ScoreCardProps {
    score: number
}

const ScoreCard = ({
                       score,
                   }: ScoreCardProps) => {

    const getScoreLabel = () => {

        if (score >= 80) {
            return "Strong match"
        }

        if (score >= 60) {
            return "Good match"
        }

        if (score >= 40) {
            return "Moderate match"
        }

        return "Needs improvement"
    }

    return (
        <div className="rounded-2xl bg-slate-50 px-6 py-10 text-center">

            <p className="text-sm font-medium text-slate-500">
                Overall Match Score
            </p>

            <div className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-indigo-100">

                <div>

                    <div className="text-5xl font-bold tracking-tight text-indigo-600">
                        {score}
                    </div>

                    <div className="mt-1 text-sm font-medium text-slate-400">
                        out of 100
                    </div>

                </div>

            </div>

            <div className="mt-5">

        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
          {getScoreLabel()}
        </span>

            </div>

        </div>
    )
}

export default ScoreCard