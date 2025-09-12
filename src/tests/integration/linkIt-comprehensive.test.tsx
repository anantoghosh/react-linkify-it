import { test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { linkIt } from '../../utils/linkIt';
import { urlRegex } from '../../utils/regexPatterns';

afterEach(() => {
  cleanup();
});

test('linkIt handles complex URL patterns from original test suite', () => {
  const testUrls = [
    'https://example.com/👨',
    'https://example.com/rst\u311Duct',
    'https://example.com/❤/#@323👨5',
    'https://testing-library.com/docs/queries/about/#textmatch',
    'https://ko.wikipedia.org/w/index.php?title=특수:DownloadAsPdf&page=위키백과%3A파일_올리기&action=show-download-screen',
    'https://google.com/search?q=.rst👩👩&client=tfs&hs=DhQ&ei=4JrG-lqq=.rst👩👩&gs_lcp=Cgdnd3MQjAAQE&sclient=gws-wiz&ved=0aDCBA',
  ];

  testUrls.forEach((url) => {
    const result = linkIt(
      `Visit ${url} today`,
      (match, key) => (
        <a key={key} href={match}>
          {match}
        </a>
      ),
      urlRegex,
    );

    expect(Array.isArray(result)).toBe(true);

    render(<div data-testid={`test-${testUrls.indexOf(url)}`}>{result}</div>);
    const link = screen.getByRole('link', { name: url });
    expect(link).toHaveAttribute('href', url);
  });
});

test('linkIt with various text contexts', () => {
  const contexts = [
    (url: string) => `${url}`,
    (url: string) => `  ${url}  `,
    (url: string) => `hello there ${url} how are you?`,
    (url: string) => `hello there ${url}. how are you?`,
    (url: string) => `hello there ${url}, how are you?`,
    (url: string) => `hello there ${url}; how are you?`,
    (url: string) => `hello there ${url}: how are you?`,
    (url: string) => `hello there (${url}) how are you?`,
    (url: string) => `hello there {${url}} how are you?`,
    (url: string) => `hello there [${url}] how are you?`,
    (url: string) => `hello there "${url}" how are you?`,
    (url: string) => `hello there '${url}' how are you?`,
  ];

  const testUrl = 'https://example.com';

  contexts.forEach((context, index) => {
    const text = context(testUrl);
    const result = linkIt(
      text,
      (match, key) => (
        <a key={key} href={match}>
          {match}
        </a>
      ),
      urlRegex,
    );

    const { unmount } = render(
      <div data-testid={`context-test-${index}`}>{result}</div>,
    );

    // Should have exactly one link with correct href within this container
    const container = screen.getByTestId(`context-test-${index}`);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', testUrl);

    unmount(); // Clean up after each iteration
  });
});

test('linkIt handles control characters correctly', () => {
  const textWithControlChars = 'https://example.com/test\u200D\u200C\u200Bpath';
  const expectedCleanUrl = 'https://example.com/testpath';

  const result = linkIt(
    `Visit ${textWithControlChars}`,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  render(<div>{result}</div>);

  // The link should have control characters filtered out
  const link = screen.getByRole('link', { name: expectedCleanUrl });
  expect(link).toHaveAttribute('href', expectedCleanUrl);
});

test('linkIt returns proper structure without unnecessary Fragment wrappers', () => {
  const text = 'Visit https://example.com today';
  const result = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  // Result should be an array with exactly 3 elements: text, link, text
  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(3);
  expect(typeof result[0]).toBe('string'); // 'Visit '
  expect(typeof result[2]).toBe('string'); // ' today'

  // No text should have Fragment wrappers when there are matches
  render(<div>{result}</div>);
  expect(screen.getByText(/Visit/)).toBeInTheDocument();
  expect(screen.getByText(/today/)).toBeInTheDocument();
});

test('linkIt returns original string when no matches found', () => {
  const text = 'This is just plain text';
  const result = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  // Should return the original string, not an array
  expect(typeof result).toBe('string');
  expect(result).toBe(text);
});

test('linkIt with mixed email and URL patterns', () => {
  const text = 'Contact user@example.com or visit https://example.com';

  // First pass for URLs
  const urlResult = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match} className="url-link">
        {match}
      </a>
    ),
    urlRegex,
  );

  // Second pass for emails on the result (simulating nested components)
  render(<div>{urlResult}</div>);

  expect(
    screen.getByRole('link', { name: 'https://example.com' }),
  ).toHaveAttribute('href', 'https://example.com');

  // The email should still be in text form since we only processed URLs
  expect(screen.getByText(/user@example.com/)).toBeInTheDocument();
});

test('linkIt preserves React element structure in children', () => {
  const text = 'Check https://example.com';
  const result = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match} data-testid="generated-link">
        {match}
      </a>
    ),
    urlRegex,
  );

  render(
    <div>
      {result}
      <p>Additional content</p>
    </div>,
  );

  expect(screen.getByTestId('generated-link')).toHaveAttribute(
    'href',
    'https://example.com',
  );
  expect(screen.getByText('Additional content')).toBeInTheDocument();
});

test('linkIt with very long URLs', () => {
  const longUrl = 'https://example.com/' + 'a'.repeat(1000);
  const text = `Visit ${longUrl}`;

  const result = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  render(<div>{result}</div>);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', longUrl);
  expect(link).toHaveTextContent(longUrl);
});

test('linkIt with empty and whitespace edge cases', () => {
  const testCases = ['', ' ', '   ', '\n', '\t', '    \n\t    '];

  testCases.forEach((testCase) => {
    const result = linkIt(
      testCase,
      (match, key) => (
        <a key={key} href={match}>
          {match}
        </a>
      ),
      urlRegex,
    );

    if (testCase === '') {
      // Empty string is handled specially
      expect(result).toBe(testCase);
    } else {
      // Non-empty text with no matches now returns original string
      expect(typeof result).toBe('string');
      expect(result).toBe(testCase);
    }
  });
});

test('linkIt regex global flag persistence', () => {
  const text = 'Visit https://example.com and https://github.com';

  // Run linkIt multiple times to ensure regex state doesn't persist
  const result1 = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  const result2 = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );

  // Both should produce the same result
  expect(Array.isArray(result1)).toBe(true);
  expect(Array.isArray(result2)).toBe(true);
  expect(result1).toHaveLength(result2.length);
});

test('linkIt performance with many matches', () => {
  const urls = Array.from({ length: 100 }, (_, i) => `https://example${i}.com`);
  const text = urls.join(' ');

  const start = performance.now();
  const result = linkIt(
    text,
    (match, key) => (
      <a key={key} href={match}>
        {match}
      </a>
    ),
    urlRegex,
  );
  const end = performance.now();

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBe(199); // 100 URLs + 99 spaces between them
  expect(end - start).toBeLessThan(100); // Should complete within 100ms
});
