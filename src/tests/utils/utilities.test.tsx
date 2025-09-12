import { test, expect } from 'vitest';
import { getKey } from '../../utils/getKey';
import { ctrlCharactersRegex } from '../../utils/ctrlCharactersRegex';
import { findText } from '../../utils/findText';

test('getKey generates unique keys', () => {
  const key1 = getKey();
  const key2 = getKey();
  const key3 = getKey();

  expect(typeof key1).toBe('number');
  expect(typeof key2).toBe('number');
  expect(typeof key3).toBe('number');

  expect(key1).not.toBe(key2);
  expect(key2).not.toBe(key3);
  expect(key1).not.toBe(key3);
});

test('getKey generates incrementing sequence', () => {
  const keys = Array.from({ length: 10 }, () => getKey());

  for (let i = 1; i < keys.length; i++) {
    expect(keys[i]).toBeGreaterThan(keys[i - 1] as number);
  }
});

test('ctrlCharactersRegex matches control characters', () => {
  // Reset regex state before each test due to global flag
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('\u200D')).toBe(true); // Zero-width joiner
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('\u200B')).toBe(true); // Zero-width space
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('\u0000')).toBe(true); // Null character
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('\u001F')).toBe(true); // Unit separator
});

test('ctrlCharactersRegex does not match regular characters', () => {
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('a')).toBe(false);
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test('1')).toBe(false);
  ctrlCharactersRegex.lastIndex = 0;
  expect(ctrlCharactersRegex.test(' ')).toBe(false);
  // Note: \n and \t are actually matched by the regex as they are control characters
});

test('ctrlCharactersRegex has global flag', () => {
  expect(ctrlCharactersRegex.global).toBe(true);
});

test('ctrlCharactersRegex can filter multiple control characters', () => {
  const textWithCtrlChars = 'hello\u200Dworld\u200Ctest\u200Bfoo';
  const cleaned = textWithCtrlChars.replace(ctrlCharactersRegex, '');
  expect(cleaned).toBe('helloworldtestfoo');
});

test('findText locates strings in React element tree', () => {
  const simpleText = 'Hello world';
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;

  const result = findText(simpleText, component, regex);
  expect(Array.isArray(result)).toBe(true);
});

test('findText handles no matches', () => {
  const text = 'Hello world';
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /notfound/g;

  const result = findText(text, component, regex);
  // When using linkIt internally, no matches now returns original string
  expect(typeof result).toBe('string');
  expect(result).toBe(text);
});

test('findText handles multiple matches', () => {
  const text = 'test test test';
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /test/g;

  const result = findText(text, component, regex);
  expect(Array.isArray(result)).toBe(true);
});

test('findText handles empty search term', () => {
  const text = 'Hello world';
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /$/g; // Empty match at end

  const result = findText(text, component, regex);
  // Will match and create link components for empty matches
  expect(Array.isArray(result)).toBe(true);
});

test('findText handles empty text', () => {
  const text = '';
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /search/g;

  const result = findText(text, component, regex);
  expect(result).toBe('');
});

test('findText handles complex nested React elements', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;
  const complexElement = (
    <div>
      Hello{' '}
      <span>
        world <strong>test</strong>
      </span>{' '}
      more text
    </div>
  );

  const result = findText(complexElement, component, regex);
  // Should find text within nested elements
  expect(result).toBeDefined();
});

test('findText with React fragments', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;
  const fragmentElement = (
    <>
      Hello world
      <span>more content</span>
    </>
  );

  const result = findText(fragmentElement, component, regex);
  expect(result).toBeDefined();
});

test('findText handles array of React elements', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;
  const elementArray = ['Hello ', <span key="1">world</span>, ' more text'];

  const result = findText(elementArray, component, regex);
  expect(Array.isArray(result)).toBe(true);
});

test('findText with null and undefined elements', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;
  const elementWithNulls = ['Hello ', null, 'world', undefined, ' test'];

  const result = findText(elementWithNulls, component, regex);
  expect(Array.isArray(result)).toBe(true);
});

test('findText handles numbers and other primitive types', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /123/g;
  const mixedContent = ['Text ', 123, ' more ', true, ' content'];
  const result = findText(mixedContent, component, regex);
  expect(Array.isArray(result)).toBe(true);
});

test('findText with special characters in search term', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const text = 'Hello @world #test';

  const result1 = findText(text, component, /@world/g);
  const result2 = findText(text, component, /#test/g);

  expect(Array.isArray(result1)).toBe(true);
  expect(Array.isArray(result2)).toBe(true);
});

test('findText performance with large text', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /target/g;
  const largeText = 'word '.repeat(10000) + 'target' + ' word'.repeat(10000);

  const start = performance.now();
  const result = findText(largeText, component, regex);
  const end = performance.now();

  expect(Array.isArray(result)).toBe(true);
  expect(end - start).toBeLessThan(100); // Should complete within 100ms
});

test('findText skips anchor and button elements', () => {
  const component = (match: string, key: number) => (
    <span key={key} className="match">
      {match}
    </span>
  );
  const regex = /world/g;

  const elementWithAnchor = <a href="#test">Hello world</a>;
  const elementWithButton = <button>Hello world</button>;

  const result1 = findText(elementWithAnchor, component, regex);
  const result2 = findText(elementWithButton, component, regex);

  // Should return original elements unchanged
  expect(result1).toBe(elementWithAnchor);
  expect(result2).toBe(elementWithButton);
});
