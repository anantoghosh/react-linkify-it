import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItHashtag } from '../../components/LinkItHashtag';

test('LinkItHashtag renders basic hashtag links with URL template', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Check #hashtag
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link', { name: '#hashtag' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://x.com/hashtag/hashtag');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('LinkItHashtag renders links with custom URL template', () => {
  render(
    <LinkItHashtag urlTemplate="https://instagram.com/explore/tags/{hashtag}">
      Check #hashtag
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link', { name: '#hashtag' });
  expect(link).toHaveAttribute(
    'href',
    'https://instagram.com/explore/tags/hashtag',
  );
});

test('LinkItHashtag handles multiple hashtags', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Check #react and #javascript hashtags
    </LinkItHashtag>,
  );

  expect(screen.getByRole('link', { name: '#react' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '#javascript' })).toBeInTheDocument();
});

test('LinkItHashtag handles hashtags with Unicode characters', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      See #café and #日本語
    </LinkItHashtag>,
  );

  expect(screen.getByRole('link', { name: '#café' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '#日本語' })).toBeInTheDocument();
});

test('LinkItHashtag handles hashtags with numbers', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Check #2024trends
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link', { name: '#2024trends' });
  expect(link).toHaveAttribute('href', 'https://x.com/hashtag/2024trends');
});

test('LinkItHashtag applies custom className', () => {
  render(
    <LinkItHashtag
      urlTemplate="https://x.com/hashtag/{hashtag}"
      className="hashtag-link"
    >
      Check #hashtag
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('hashtag-link');
});

test('LinkItHashtag filters control characters from hashtags', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Check #hashtag works
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', 'https://x.com/hashtag/hashtag');
  expect(link).toHaveTextContent('#hashtag');
});

test('LinkItHashtag preserves non-hashtag text', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Before #hashtag after
    </LinkItHashtag>,
  );

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '#hashtag' })).toBeInTheDocument();
});

test('LinkItHashtag returns text unchanged when no hashtags found', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      This is just plain text
    </LinkItHashtag>,
  );

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItHashtag handles nested React elements', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      <div>
        Check <span>#hashtag</span> today
      </div>
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link', { name: '#hashtag' });
  expect(link).toBeInTheDocument();
});

test('LinkItHashtag ignores hashtags inside anchor tags', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      <a href="https://social.com/hashtag/existing">#hashtag</a>
    </LinkItHashtag>,
  );

  // Only the existing link should be present
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute(
    'href',
    'https://social.com/hashtag/existing',
  );
});

test('LinkItHashtag does not linkify invalid hashtag formats', () => {
  render(
    <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
      Check # symbol only
    </LinkItHashtag>,
  );

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getByText('Check # symbol only')).toBeInTheDocument();
});
