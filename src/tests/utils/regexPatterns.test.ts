import { test, expect } from 'vitest';
import {
  urlRegex,
  emailRegex,
  twitterRegex,
  hashtagRegex,
  mentionRegex,
} from '../../utils';

// URL Regex Tests
test('urlRegex matches basic URLs', () => {
  expect(urlRegex.test('https://example.com')).toBe(true);
  expect(urlRegex.test('http://example.com')).toBe(true);
  expect(urlRegex.test('www.example.com')).toBe(true);
});

test('urlRegex matches URLs with paths', () => {
  expect(urlRegex.test('https://example.com/path/to/resource')).toBe(true);
  expect(urlRegex.test('https://example.com/path?param=value')).toBe(true);
  expect(urlRegex.test('https://example.com/path#section')).toBe(true);
});

test('urlRegex matches URLs with Unicode characters', () => {
  expect(urlRegex.test('https://example.com/👨‍💻')).toBe(true);
  expect(urlRegex.test('https://café.example.com')).toBe(true);
});

test('urlRegex does not match invalid URLs', () => {
  expect(urlRegex.test('not a url')).toBe(false);
  expect(urlRegex.test('http://')).toBe(false);
  expect(urlRegex.test('www.')).toBe(false);
});

// Email Regex Tests
test('emailRegex matches basic emails', () => {
  expect(emailRegex.test('user@example.com')).toBe(true);
  expect(emailRegex.test('test.email@domain.org')).toBe(true);
  expect(emailRegex.test('user+tag@example.co.uk')).toBe(true);
});

test('emailRegex matches Unicode emails', () => {
  expect(emailRegex.test('δοκιμή@παράδειγμα.δοκιμή')).toBe(true);
  expect(emailRegex.test('用户@例子.公司')).toBe(true);
});

test('emailRegex does not match invalid emails', () => {
  expect(emailRegex.test('notanemail')).toBe(false);
  expect(emailRegex.test('user@@example.com')).toBe(false);
  expect(emailRegex.test('user@')).toBe(false);
  expect(emailRegex.test('@example.com')).toBe(false);
});

// Twitter Regex Tests
test('twitterRegex matches Twitter handles', () => {
  expect(twitterRegex.test('@username')).toBe(true);
  expect(twitterRegex.test('@user_name')).toBe(true);
  expect(twitterRegex.test('@user123')).toBe(true);
});

test('twitterRegex does not match invalid handles', () => {
  expect(twitterRegex.test('username')).toBe(false); // Missing @
  expect(twitterRegex.test('@')).toBe(false); // Just @
  expect(twitterRegex.test('@@username')).toBe(false); // Double @
});

// Hashtag Regex Tests
test('hashtagRegex matches hashtags', () => {
  expect(hashtagRegex.test('#hashtag')).toBe(true);
  expect(hashtagRegex.test('#café')).toBe(true);
  expect(hashtagRegex.test('#日本語')).toBe(true);
  expect(hashtagRegex.test('#2024trends')).toBe(true);
});

test('hashtagRegex does not match invalid hashtags', () => {
  expect(hashtagRegex.test('hashtag')).toBe(false); // Missing #
  expect(hashtagRegex.test('#')).toBe(false); // Just #
  expect(hashtagRegex.test('##hashtag')).toBe(false); // Double #
});

// Mention Regex Tests
test('mentionRegex matches mentions', () => {
  expect(mentionRegex.test('@username')).toBe(true);
  expect(mentionRegex.test('@user_name')).toBe(true);
  expect(mentionRegex.test('@user123')).toBe(true);
  expect(mentionRegex.test('@ユーザー')).toBe(true);
});

test('mentionRegex does not match invalid mentions', () => {
  expect(mentionRegex.test('username')).toBe(false); // Missing @
  expect(mentionRegex.test('@')).toBe(false); // Just @
  expect(mentionRegex.test('@@username')).toBe(false); // Double @
});

// Global flag tests
test('all regexes have global flag for proper linkification', () => {
  expect(urlRegex.global).toBe(true);
  expect(emailRegex.global).toBe(true);
  expect(twitterRegex.global).toBe(true);
  expect(hashtagRegex.global).toBe(true);
  expect(mentionRegex.global).toBe(true);
});

// Extract matches tests
test('urlRegex extracts multiple matches', () => {
  const text = 'Visit https://example.com and www.github.com';
  const matches = text.match(urlRegex);
  expect(matches).toHaveLength(2);
  expect(matches?.[0]).toBe('https://example.com');
  expect(matches?.[1]).toBe('www.github.com');
});

test('emailRegex extracts multiple matches', () => {
  const text = 'Contact user@example.com or admin@test.org';
  const matches = text.match(emailRegex);
  expect(matches).toHaveLength(2);
  expect(matches?.[0]).toBe('user@example.com');
  expect(matches?.[1]).toBe('admin@test.org');
});

test('hashtagRegex extracts multiple matches', () => {
  const text = 'Love #javascript and #react programming';
  const matches = text.match(hashtagRegex);
  expect(matches).toHaveLength(2);
  expect(matches?.[0]).toBe('#javascript');
  expect(matches?.[1]).toBe('#react');
});

test('mentionRegex extracts multiple matches', () => {
  const text = 'Thanks @octocat and @defunkt for GitHub';
  const matches = text.match(mentionRegex);
  expect(matches).toHaveLength(2);
  expect(matches?.[0]).toBe('@octocat');
  expect(matches?.[1]).toBe('@defunkt');
});
