![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# Workshop 1: Building a Smart Resume Evaluator

### The Project Goal

In this workshop, **your task is to build an API** that takes:

* a **resume (text input)**
* a **job description (text input)**

and returns a **structured evaluation** of how well the resume matches the job.

The API should:

* Analyze the resume against the job requirements
* Identify strengths and missing skills
* Provide clear, actionable feedback
* Return the result as a **structured Java object** (not unstructured text)

The final outcome is a backend service that transforms raw text into **usable, structured insights** that can be integrated into real applications.

---

### Core Concepts & Learning Goals

#### 1. The Power of "Personas" (System Prompts)

* Learning how to tell the AI exactly *who* it is (e.g., "You are a Senior Technical Recruiter with 20 years of experience").
* A well-defined persona dramatically changes the quality and tone of the AI's feedback.

#### 2. Prompt Templates

* Moving away from static strings to dynamic templates using placeholders like `{resumeText}` and `{jobDescriptionText}`.
* Templates allow your Java application to pass user data into the AI's logic without "hardcoding" the instructions.

#### 3. Structured Data: AI to Java POJO

* Forcing the AI to return a response as a Java `record` or `class` instead of a long, messy block of text.
* In a real application, you need to display scores in a chart or list "Missing Skills" as bullets. You can't do that with raw text; you need **Objects**.

---

### Optional Task: Support PDF Uploads

*Move from Text to Documents.*

Extend the API to support **PDF file uploads** instead of plain text input or both.

* Accept a **PDF file** (resume and/or job description) via the API
* Extract the text content using a library such as **Apache Tika**, **PDFBox**, or similar.
* Reuse your existing evaluation logic to analyze the extracted text.
* Return the same **structured evaluation response**

* Implement a privacy step to remove sensitive information (e.g., email, phone number, address)
* Replace detected data with `[REDACTED]` before sending it to the AI

---

