import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItUrl } from '../../components/LinkItUrl';

test('LinkItUrl renders basic URL links', () => {
  render(<LinkItUrl>Visit https://example.com for info</LinkItUrl>);

  const link = screen.getByRole('link', { name: 'https://example.com' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://example.com');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('LinkItUrl handles www URLs by adding http prefix', () => {
  render(<LinkItUrl>Check www.example.com</LinkItUrl>);

  const link = screen.getByRole('link', { name: 'www.example.com' });
  expect(link).toHaveAttribute('href', 'http://www.example.com');
});

test('LinkItUrl handles multiple URLs in text', () => {
  render(
    <LinkItUrl>
      Visit https://google.com and https://github.com for resources
    </LinkItUrl>,
  );

  expect(
    screen.getByRole('link', { name: 'https://google.com' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'https://github.com' }),
  ).toBeInTheDocument();
});

test('LinkItUrl handles URLs with paths and parameters', () => {
  render(<LinkItUrl>API: https://api.example.com/v1/users?page=1</LinkItUrl>);

  const link = screen.getByRole('link', {
    name: 'https://api.example.com/v1/users?page=1',
  });
  expect(link).toHaveAttribute(
    'href',
    'https://api.example.com/v1/users?page=1',
  );
});

test('LinkItUrl applies custom className', () => {
  render(
    <LinkItUrl className="custom-link">Visit https://example.com</LinkItUrl>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('custom-link');
});

test('LinkItUrl filters control characters from URLs', () => {
  const text = `Visit https://example.com/test\u200Dpath`;
  const filteredText = `https://example.com/testpath`;

  render(<LinkItUrl>{text}</LinkItUrl>);

  const link = screen.getByRole('link', { name: filteredText });
  expect(link).toHaveAttribute('href', filteredText);
  expect(link).toHaveTextContent(filteredText);
});

test('LinkItUrl preserves non-URL text', () => {
  render(<LinkItUrl>Before https://example.com after</LinkItUrl>);

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'https://example.com' }),
  ).toBeInTheDocument();
});

test('LinkItUrl returns text unchanged when no URLs found', () => {
  render(<LinkItUrl>This is just plain text</LinkItUrl>);

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItUrl handles nested React elements', () => {
  render(
    <LinkItUrl>
      <div>
        Check out <span>https://example.com</span> today
      </div>
    </LinkItUrl>,
  );

  const link = screen.getByRole('link', { name: 'https://example.com' });
  expect(link).toBeInTheDocument();
});

test('LinkItUrl ignores URLs inside anchor tags', () => {
  render(
    <LinkItUrl>
      <a href="https://existing.com">https://example.com</a>
    </LinkItUrl>,
  );

  // Only the existing link should be present, the URL inside shouldn't be linkified
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute('href', 'https://existing.com');
});

test('LinkItUrl handles Unicode domain names', () => {
  render(<LinkItUrl>Visit https://café.example.com</LinkItUrl>);

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://café.example.com');
});
