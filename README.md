# Resume Evaluator

AI-powered resume evaluation API built with:

- Java 25
- Spring Boot 4.1.1
- Spring AI 2.0.1
- OpenAI
- Apache PDFBox
- Maven

## Features

- Resume/job-description matching
- AI-generated match score
- Matched skills
- Missing skills
- Recommendations
- JSON input
- PDF resume upload
- PII redaction
- Input validation
- OpenAPI documentation

## Requirements

- Java 25
- Maven
- OpenAI API key

## Configuration

Set:

OPENAI_API_KEY=your-api-key

## Run

./mvnw spring-boot:run

## API

POST /api/v1/evaluations

POST /api/v1/evaluations/pdf

## Health

GET /actuator/health

## API Documentation

/swagger-ui/index.html