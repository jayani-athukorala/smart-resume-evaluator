package se.lexicon.resumeevaluator.document;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PiiRedactorTest {

    private final PiiRedactor redactor = new PiiRedactor();

    @Test
    void shouldRedactEmail() {

        String input = "Contact me at john.smith@example.com";

        String result = redactor.redact(input);

        assertThat(result)
                .isEqualTo("Contact me at [REDACTED]");
    }

    @Test
    void shouldRedactPhoneNumber() {

        String input = "Phone: +46 70 123 45 67";

        String result = redactor.redact(input);

        assertThat(result)
                .contains("[REDACTED]")
                .doesNotContain("+46 70 123 45 67");
    }

    @Test
    void shouldRedactEmailAndPhone() {

        String input = """
                John Smith
                john.smith@example.com
                +46 70 123 45 67

                Senior Java Developer
                """;

        String result = redactor.redact(input);

        assertThat(result)
                .doesNotContain("john.smith@example.com")
                .doesNotContain("+46 70 123 45 67")
                .contains("Senior Java Developer");
    }

    @Test
    void shouldNotModifyNormalResumeText() {

        String input = """
            Senior Java Developer
            5 years of experience
            Spring Boot
            PostgreSQL
            Docker
            """;

        String result = redactor.redact(input);

        assertThat(result)
                .isEqualTo(input);
    }
}