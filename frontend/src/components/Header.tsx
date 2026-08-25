const Header = () => {
    return (
        <header className="border-b border-slate-200 bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
                        AI
                    </div>

                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900">
                            Resume Evaluator
                        </h1>

                        <p className="text-xs text-slate-500">
                            AI-powered resume analysis
                        </p>
                    </div>

                </div>

                <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 sm:flex">

                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    AI Evaluation

                </div>

            </div>

        </header>
    )
}

export default Header