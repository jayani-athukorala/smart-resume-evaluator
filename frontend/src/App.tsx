import { useState } from "react"
import EvaluationForm from "./components/EvaluationForm"
import EvaluationResult from "./components/EvaluationResult"
import LoadingSpinner from "./components/LoadingSpinner"
import type { ResumeEvaluationResponse } from "./types"

function App() {

  const [result, setResult] =
      useState<ResumeEvaluationResponse | null>(null)

  const [error, setError] = useState("")

  const [loading, setLoading] =
      useState(false)

  function handleResult(
      evaluationResult: ResumeEvaluationResponse
  ) {
    setResult(evaluationResult)
  }

  return (
      <div className="min-h-screen bg-gray-100">

        <header className="bg-indigo-700 text-white shadow-md">

          <div className="mx-auto max-w-6xl px-6 py-8">

            <h1 className="text-3xl font-bold">
              AI Resume Evaluator
            </h1>

            <p className="mt-2 text-indigo-100">
              Compare your resume against a job description
              using AI.
            </p>

          </div>

        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">

          <div className="rounded-xl bg-white p-6 shadow-lg">

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Evaluate Your Resume
            </h2>

            <p className="mb-6 text-gray-600">
              Paste or upload (PDF) your resume and the job description below.
            </p>

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>
            )}

            <EvaluationForm
                onResult={handleResult}
                onError={setError}
                onLoading={setLoading}
            />

            {loading && <LoadingSpinner />}

          </div>

          {result && !loading && (
              <EvaluationResult result={result} />
          )}

        </main>

        <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">

          AI Resume Evaluator

        </footer>

      </div>
  )
}

export default App