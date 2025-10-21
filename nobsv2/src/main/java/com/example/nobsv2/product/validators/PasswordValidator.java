package com.example.nobsv2.product.validators;

public class PasswordValidator {
    private static final int MIN_LENGTH = 8;
    private static final String UPPERCASE_PATTERN = ".*[A-Z].*";
    private static final String LOWERCASE_PATTERN = ".*[a-z].*";
    private static final String DIGIT_PATTERN = ".*\\d.*";
    private static final String SPECIAL_CHAR_PATTERN = ".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*";

    public static boolean isPasswordStrong(String password) {
        if (password == null || password.length() < MIN_LENGTH) {
            return false;
        }

        return password.matches(UPPERCASE_PATTERN) &&
                password.matches(LOWERCASE_PATTERN) &&
                password.matches(DIGIT_PATTERN) &&
                password.matches(SPECIAL_CHAR_PATTERN);
    }

    public static String getPasswordErrorMessage(String password) {
        if (password == null || password.isEmpty()) {
            return "Password is required.";
        }

        if (password.length() < MIN_LENGTH) {
            return "Password must be at least " + MIN_LENGTH + " characters long.";
        }

        if (!password.matches(UPPERCASE_PATTERN)) {
            return "Password must contain at least one uppercase letter (A-Z).";
        }

        if (!password.matches(LOWERCASE_PATTERN)) {
            return "Password must contain at least one lowercase letter (a-z).";
        }

        if (!password.matches(DIGIT_PATTERN)) {
            return "Password must contain at least one number (0-9).";
        }

        if (!password.matches(SPECIAL_CHAR_PATTERN)) {
            return "Password must contain at least one special character (!@#$%^&*).";
        }

        return null; // Password is strong
    }
}

