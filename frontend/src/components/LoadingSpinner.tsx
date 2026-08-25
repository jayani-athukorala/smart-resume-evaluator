const LoadingSpinner = () => {
    return (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">

            <div className="flex items-center gap-4">

                <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

                <div>

                    <p className="text-sm font-semibold text-indigo-900">
                        Analyzing your resume...
                    </p>

                    <p className="mt-1 text-xs text-indigo-600">
                        AI is comparing your resume against the job description.
                    </p>

                </div>

            </div>

        </div>
    )
}

export default LoadingSpinner