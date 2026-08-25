# 🤖 Resume Evaluator

> AI-powered resume evaluation platform that analyzes a resume against a job description and provides an actionable recruitment-style evaluation.

[![Java](https://img.shields.io/badge/Java-25-orange?logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring%20AI-2.0.1-6DB33F?logo=spring)](https://spring.io/projects/spring-ai)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-TypeScript-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-black?logo=openai)](https://openai.com/)
[![Maven](https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven)](https://maven.apache.org/)

---

## 🚀 Live Demo

### 🌐 Try the Resume Evaluator

**👉 [Open Live Demo](https://resume-evaluator.onrender.com)**

Upload a PDF resume or paste resume text, provide a job description, and receive an AI-powered evaluation.

> ⚠️ The live demo uses an external AI API. Please avoid submitting sensitive personal information or confidential resumes.

---

## 📚 Workshop

This project was developed as part of the Spring AI workshop.

### 📖 Workshop Documentation

**👉 [Open Workshop Document](Spring-AI-Workshop1.md)**

The workshop document covers the development process, architecture, Spring AI integration, testing, document processing, and deployment.

---

# ✨ Features

### 📄 Resume Evaluation

- Paste resume text directly into the application
- Upload a resume as a PDF
- Compare the resume against a job description
- Generate an AI-powered overall match score

### 🧠 AI Analysis

The application provides:

- 🎯 Overall match score
- 💪 Resume strengths
- 🛠️ Matched skills
- ❌ Missing skills
- 💡 Recommendations
- 📝 Recruiter-style summary

### 🔐 Privacy & Security

- PDF text extraction
- PII redaction
- Input validation
- API key stored only on the backend
- No OpenAI API key exposed to the frontend

### 🧪 Testing

The backend includes tests for:

- Controller endpoints
- Service logic
- PII redaction
- Application context

### 📖 API Documentation

OpenAPI / Swagger documentation is available for exploring the backend API.

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       User           │
                         │                      │
                         │  Resume + Job Desc.  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │   TypeScript + Vite  │
                         │   Tailwind CSS       │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                    ┌───────────────────────────────┐
                    │      Spring Boot Backend      │
                    │                               │
                    │  Resume Evaluation Controller │
                    └───────────────┬───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
          ┌──────────────────┐            ┌──────────────────┐
          │ PDF Processing   │            │ Evaluation       │
          │                  │            │ Service          │
          │ PDFBox           │            │                  │
          │ PII Redaction    │            │ Spring AI        │
          └────────┬─────────┘            └────────┬─────────┘
                   │                               │
                   │                               ▼
                   │                      ┌─────────────────┐
                   │                      │     OpenAI      │
                   │                      │      API        │
                   │                      └─────────────────┘
                   │                               │
                   └──────────────┬────────────────┘
                                  ▼
                         ┌──────────────────┐
                         │ Evaluation JSON  │
                         │                  │
                         │ Score            │
                         │ Skills           │
                         │ Recommendations  │
                         └──────────────────┘