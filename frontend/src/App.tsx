import { useState } from "react"

import EvaluationForm from "./components/EvaluationForm/EvaluationForm"
import EvaluationResult from "./components/EvaluationResult/EvaluationResult"
import LoadingSpinner from "./components/LoadingSpinner"
import Header from "./components/Header"
import Footer from "./components/Footer"

import type { ResumeEvaluationResponse } from "./types"

const App = () => {
  const [result, setResult] =
      useState<ResumeEvaluationResponse | null>(null)

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false)

  const handleResult = (
      evaluationResult: ResumeEvaluationResponse
  ) => {
    setResult(evaluationResult)
  }

  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">

        <Header />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">

          {/* Page introduction */}

          <div className="mb-8 max-w-3xl">

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Resume analysis
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              See how well your resume matches the job.
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Upload your resume or paste the content, add the job
              description, and let AI identify your strengths,
              missing skills, and opportunities.
            </p>

          </div>

          {/* Evaluation form */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

              <h2 className="text-lg font-semibold text-slate-900">
                Evaluate your resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Provide your resume and the job description below.
              </p>

            </div>

            <div className="p-6 sm:p-8">

              {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

                    <div className="flex gap-3">

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                        !
                      </div>

                      <div>
                        <p className="font-semibold text-red-800">
                          Evaluation failed
                        </p>

                        <p className="mt-1 text-sm text-red-700">
                          {error}
                        </p>
                      </div>

                    </div>

                  </div>
              )}

              <EvaluationForm
                  onResult={handleResult}
                  onError={setError}
                  onLoading={setLoading}
              />

              {loading && (
                  <div className="mt-8">
                    <LoadingSpinner />
                  </div>
              )}

            </div>

          </div>

          {/* Results */}

          {result && !loading && (
              <EvaluationResult result={result} />
          )}

        </main>

        <Footer />

      </div>
  )
}

export default App