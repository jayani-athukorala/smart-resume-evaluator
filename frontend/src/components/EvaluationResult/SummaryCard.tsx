interface SummaryCardProps {
    summary: string
}

const SummaryCard = ({
                         summary,
                     }: SummaryCardProps) => {

    return (
        <div className="mt-8 rounded-2xl border border-slate-200 p-6">

            <div className="mb-4 flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 font-bold text-indigo-600">
                    ✦
                </div>

                <div>

                    <h3 className="font-semibold text-slate-900">
                        AI Summary
                    </h3>

                    <p className="text-xs text-slate-400">
                        Overall assessment
                    </p>

                </div>

            </div>

            <p className="leading-7 text-slate-600">
                {summary}
            </p>

        </div>
    )
}

export default SummaryCard