package se.lexicon.resumeevaluator.document;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class ResumeDocumentService {

    private static final int MAX_TEXT_LENGTH = 50_000;
    private final PdfTextExtractor pdfTextExtractor;
    private final PiiRedactor piiRedactor;
    private static final Logger log = LoggerFactory.getLogger(ResumeDocumentService.class);

    public String extractAndRedact(MultipartFile file) {

        log.info("Processing uploaded resume PDF: {}", file.getOriginalFilename());

        String extractedText = pdfTextExtractor.extractText(file);

        if (extractedText.length() > MAX_TEXT_LENGTH) {
            throw new IllegalArgumentException("Resume text exceeds the maximum allowed length");
        }

        String redactedText = piiRedactor.redact(extractedText);

        log.info("Resume PDF processed successfully");

        return redactedText;
    }
}
