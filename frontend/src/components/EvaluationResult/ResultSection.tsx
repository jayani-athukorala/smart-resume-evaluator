interface ResultSectionProps {
    title: string
    items: string[]
    icon: string
    variant:
        | "success"
        | "primary"
        | "warning"
        | "purple"
}

const ResultSection = ({
                           title,
                           items,
                           icon,
                           variant,
                       }: ResultSectionProps) => {

    const styles = {

        success: {
            icon: "bg-emerald-50 text-emerald-600",
            bullet: "bg-emerald-500",
        },

        primary: {
            icon: "bg-indigo-50 text-indigo-600",
            bullet: "bg-indigo-500",
        },

        warning: {
            icon: "bg-amber-50 text-amber-600",
            bullet: "bg-amber-500",
        },

        purple: {
            icon: "bg-purple-50 text-purple-600",
            bullet: "bg-purple-500",
        },

    }

    const currentStyle = styles[variant]

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="mb-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg font-bold ${currentStyle.icon}`}
                    >
                        {icon}
                    </div>

                    <h3 className="font-semibold text-slate-900">
                        {title}
                    </h3>

                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
          {items.length}
        </span>

            </div>

            {items.length === 0 ? (

                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-400">
                    None identified.
                </p>

            ) : (

                <ul className="space-y-2">

                    {items.map((item, index) => (

                        <li
                            key={index}
                            className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600"
                        >

              <span
                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${currentStyle.bullet}`}
              />

                            <span>
                {item}
              </span>

                        </li>

                    ))}

                </ul>

            )}

        </div>
    )
}

export default ResultSection