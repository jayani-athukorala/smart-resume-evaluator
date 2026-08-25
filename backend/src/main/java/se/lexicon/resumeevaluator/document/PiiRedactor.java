package se.lexicon.resumeevaluator.document;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class PiiRedactor {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");

    private static final Pattern PHONE_PATTERN = Pattern.compile("(?<!\\d)(?:\\+?\\d[\\d\\s().-]{7,}\\d)(?!\\d)");

    public String redact(String text) {

        if (text == null || text.isBlank()) {
            return text;
        }

        String redacted = text;

        redacted = EMAIL_PATTERN.matcher(redacted)
                .replaceAll("[REDACTED]");

        redacted = PHONE_PATTERN.matcher(redacted)
                .replaceAll("[REDACTED]");

        return redacted;
    }
}
