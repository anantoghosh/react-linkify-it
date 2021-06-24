import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';
import addLinks from './index';

const renderWithId = (child: string | JSX.Element[]) =>
  render(<div data-testid={'addLinks'}>{child}</div>);

const urls: readonly string[] = [
  'http://www.example.com',
  'https://www.example2.com',
  'http://example3.com',
  'https://example4.com',
  'https://example5.co.uk',
  'https://example6.co.uk/test/branch',
  'https://example7.com/test/branch/',
];

test('Single http link', () => {
  const text = `${urls[0]}`;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text);

  expect(
    screen.getByRole('link', {
      name: urls[0],
    })
  ).toBeInTheDocument();
});

test('Single https link', () => {
  const text = `${urls[1]}`;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text);

  expect(
    screen.getByRole('link', {
      name: urls[1],
    })
  ).toBeInTheDocument();
});

test('Single http link with no domain', () => {
  const text = `${urls[2]}`;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text);

  expect(
    screen.getByRole('link', {
      name: urls[2],
    })
  ).toBeInTheDocument();
});

test('Single https link with no domain', () => {
  const text = `${urls[3]}`;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text);

  expect(
    screen.getByRole('link', {
      name: urls[3],
    })
  ).toBeInTheDocument();
});

test('Links in text block', () => {
  const text = `hello ${urls[0]}, how are you ${urls[1]} things are going fine ${urls[2]}
    ${urls[3]} urls are getting ${urls[4]} ${urls[5]}. ${urls[6]},\n
    created.
  `;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });

  for (const name of urls) {
    expect(screen.getByRole('link', { name })).toBeInTheDocument();
  }
});

test('Empty', () => {
  const text = `    .    `;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId('addLinks')).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });
});
