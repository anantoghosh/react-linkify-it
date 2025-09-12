/**
 * Regular expression to match control characters that should be removed from URLs.
 * Matches Unicode control characters, format characters, and zero-width characters.
 */
export const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
