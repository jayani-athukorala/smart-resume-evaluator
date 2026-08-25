interface JobDescriptionInputProps {
    value: string
    onChange: (value: string) => void
}

const JobDescriptionInput = ({
                                 value,
                                 onChange,
                             }: JobDescriptionInputProps) => {

    return (
        <section>

            <div className="mb-4 flex items-end justify-between">

                <div>

                    <h3 className="text-sm font-semibold text-slate-900">
                        Job Description
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Paste the job description you're applying for.
                    </p>

                </div>

                <span className="hidden text-xs text-slate-400 sm:block">
          Step 2 of 2
        </span>

            </div>

            <textarea
                id="jobDescription"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder="Paste the job description here..."
                rows={8}
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

        </section>
    )
}

export default JobDescriptionInput