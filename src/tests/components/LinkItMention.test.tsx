import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItMention } from '../../components/LinkItMention';

test('LinkItMention renders basic mention links with URL template', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Follow @username
    </LinkItMention>,
  );

  const link = screen.getByRole('link', { name: '@username' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://x.com/username');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('LinkItMention renders links with custom URL template', () => {
  render(
    <LinkItMention urlTemplate="https://github.com/{mention}">
      Follow @username
    </LinkItMention>,
  );

  const link = screen.getByRole('link', { name: '@username' });
  expect(link).toHaveAttribute('href', 'https://github.com/username');
});

test('LinkItMention handles multiple mentions', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Follow @user1 and @user_name for updates
    </LinkItMention>,
  );

  expect(screen.getByRole('link', { name: '@user1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '@user_name' })).toBeInTheDocument();
});

test('LinkItMention handles mentions with numbers', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Follow @user123
    </LinkItMention>,
  );

  const link = screen.getByRole('link', { name: '@user123' });
  expect(link).toHaveAttribute('href', 'https://x.com/user123');
});

test('LinkItMention handles Unicode mentions', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Follow @ユーザー
    </LinkItMention>,
  );

  const link = screen.getByRole('link', { name: '@ユーザー' });
  expect(link).toHaveAttribute(
    'href',
    'https://x.com/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC',
  );
});

test('LinkItMention applies custom className', () => {
  render(
    <LinkItMention
      urlTemplate="https://x.com/{mention}"
      className="mention-link"
    >
      Follow @username
    </LinkItMention>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('mention-link');
});

test('LinkItMention filters control characters from mentions', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Follow @user\u200Dname
    </LinkItMention>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', 'https://x.com/user');
  expect(link).toHaveTextContent('@user');
});

test('LinkItMention preserves non-mention text', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Before @username after
    </LinkItMention>,
  );

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '@username' })).toBeInTheDocument();
});

test('LinkItMention returns text unchanged when no mentions found', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      This is just plain text
    </LinkItMention>,
  );

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItMention handles nested React elements', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      <div>
        Follow <span>@username</span> today
      </div>
    </LinkItMention>,
  );

  const link = screen.getByRole('link', { name: '@username' });
  expect(link).toBeInTheDocument();
});

test('LinkItMention ignores mentions inside anchor tags', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      <a href="https://x.com/existing">@username</a>
    </LinkItMention>,
  );

  // Only the existing link should be present
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute('href', 'https://x.com/existing');
});

test('LinkItMention does not linkify invalid mention formats', () => {
  render(
    <LinkItMention urlTemplate="https://x.com/{mention}">
      Just @ symbol only
    </LinkItMention>,
  );

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getByText('Just @ symbol only')).toBeInTheDocument();
});
