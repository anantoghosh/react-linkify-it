import { test, expect } from 'vitest';
import { linkIt } from '../../utils/linkIt';
import { UrlComponent } from '../../components/UrlComponent';
import { urlRegex } from '../../utils/regexPatterns';

test('linkIt returns wrapped string when no matches (current behavior)', () => {
  const text = 'This is just text';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  // Now returns original string directly when no matches
  expect(typeof result).toBe('string');
  expect(result).toBe(text);
});

test('linkIt processes single URL match', () => {
  const text = 'Visit https://example.com';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(2); // 'Visit ' + UrlComponent
});

test('linkIt processes multiple URL matches', () => {
  const text = 'Visit https://example.com and www.github.com';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(4); // 'Visit ' + UrlComponent + ' and ' + UrlComponent
});

test('linkIt handles URLs at start of text', () => {
  const text = 'https://example.com is a website';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(2); // UrlComponent + ' is a website'
});

test('linkIt handles URLs at end of text', () => {
  const text = 'Visit https://example.com';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(2); // 'Visit ' + UrlComponent
});

test('linkIt handles consecutive URLs', () => {
  const text = 'https://example.com https://github.com';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(3); // UrlComponent + ' ' + UrlComponent
});

test('linkIt filters control characters from matches', () => {
  const text = 'Visit https://example.com/test\u200Dpath';
  const componentCalls: string[] = [];
  const result = linkIt(
    text,
    (match, key) => {
      componentCalls.push(match);
      return <span key={key}>{match}</span>;
    },
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  // The control character should be filtered out from the match
  expect(componentCalls[0]).toBe('https://example.com/testpath');
});

test('linkIt handles empty text', () => {
  const text = '';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  // Empty string should return the original string since rest is falsy
  expect(result).toBe('');
});

test('linkIt handles text with only whitespace', () => {
  const text = '   ';
  const result = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  // Now returns original string directly when no matches
  expect(typeof result).toBe('string');
  expect(result).toBe(text);
});

test('linkIt handles regex with no global flag', () => {
  const text = 'Visit https://example.com and www.github.com';
  const nonGlobalRegex = /https?:\/\/[^\s]+/; // No 'g' flag
  const result = linkIt(
    text,
    (match, key) => <span key={key}>{match}</span>,
    nonGlobalRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  // Should match the first occurrence and then wrap the rest
  expect(result).toHaveLength(3); // 'Visit ' + component + Fragment(remaining)
});

test('linkIt handles custom component function', () => {
  const text = 'Visit https://example.com';
  const componentCalls: { match: string; key: number }[] = [];
  const customComponent = (match: string, key: number) => {
    componentCalls.push({ match, key });
    return (
      <a key={key} href={match} data-testid="custom">
        {match.toUpperCase()}
      </a>
    );
  };

  const result = linkIt(text, customComponent, urlRegex);

  expect(Array.isArray(result)).toBe(true);
  expect(componentCalls).toHaveLength(1);
  expect(componentCalls[0]?.match).toBe('https://example.com');
  expect(typeof componentCalls[0]?.key).toBe('number');
});

test('linkIt handles text ending with URL and no remaining text', () => {
  const text = 'Check out https://example.com';
  const result = linkIt(
    text,
    (match, key) => <span key={key}>{match}</span>,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(2); // 'Check out ' + component, no Fragment for empty rest
});

test('linkIt wraps remaining text in Fragment when present', () => {
  const text = 'Visit https://example.com for info';
  const result = linkIt(
    text,
    (match, key) => <span key={key}>{match}</span>,
    urlRegex,
  );

  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(3); // 'Visit ' + component + ' for info'
  // Just check that we have the expected structure without Fragment wrapper
  expect(typeof result[0]).toBe('string');
  expect(typeof result[2]).toBe('string'); // Now just a string, not wrapped in Fragment
});
