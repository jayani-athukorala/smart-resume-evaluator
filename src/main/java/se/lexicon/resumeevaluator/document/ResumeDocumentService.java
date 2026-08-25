package se.lexicon.resumeevaluator.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResumeDocumentService {

    private final PdfTextExtractor pdfTextExtractor;
    private final PiiRedactor piiRedactor;

    public String extractAndRedact(MultipartFile file) {

        String extractedText = pdfTextExtractor.extractText(file);

        return piiRedactor.redact(extractedText);
    }
}
