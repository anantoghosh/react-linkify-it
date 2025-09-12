import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItTwitter } from '../../components/LinkItTwitter';

test('LinkItTwitter renders basic Twitter handle links', () => {
  render(<LinkItTwitter>Follow @username</LinkItTwitter>);

  const link = screen.getByRole('link', { name: '@username' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://x.com/username');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('LinkItTwitter handles multiple Twitter handles', () => {
  render(
    <LinkItTwitter>Follow @user1 and @user_name for updates</LinkItTwitter>,
  );

  expect(screen.getByRole('link', { name: '@user1' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '@user_name' })).toBeInTheDocument();
});

test('LinkItTwitter handles handles with numbers', () => {
  render(<LinkItTwitter>Check @user123 profile</LinkItTwitter>);

  const link = screen.getByRole('link', { name: '@user123' });
  expect(link).toHaveAttribute('href', 'https://x.com/user123');
});

test('LinkItTwitter applies custom className', () => {
  render(
    <LinkItTwitter className="twitter-link">Follow @username</LinkItTwitter>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('twitter-link');
});

test('LinkItTwitter filters control characters from handles', () => {
  const text = `Follow @user\u200Dname`;
  const filteredHandle = `@user`;

  render(<LinkItTwitter>{text}</LinkItTwitter>);

  const link = screen.getByRole('link', { name: filteredHandle });
  expect(link).toHaveAttribute('href', 'https://x.com/user');
  expect(link).toHaveTextContent(filteredHandle);
});

test('LinkItTwitter preserves non-handle text', () => {
  render(<LinkItTwitter>Before @username after</LinkItTwitter>);

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: '@username' })).toBeInTheDocument();
});

test('LinkItTwitter returns text unchanged when no handles found', () => {
  render(<LinkItTwitter>This is just plain text</LinkItTwitter>);

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItTwitter handles nested React elements', () => {
  render(
    <LinkItTwitter>
      <div>
        Follow <span>@username</span> today
      </div>
    </LinkItTwitter>,
  );

  const link = screen.getByRole('link', { name: '@username' });
  expect(link).toBeInTheDocument();
});

test('LinkItTwitter ignores handles inside anchor tags', () => {
  render(
    <LinkItTwitter>
      <a href="https://x.com/existing">@username</a>
    </LinkItTwitter>,
  );

  // Only the existing link should be present
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute('href', 'https://x.com/existing');
});

test('LinkItTwitter does not linkify invalid handles', () => {
  render(<LinkItTwitter>Just @ symbol only</LinkItTwitter>);

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.getByText('Just @ symbol only')).toBeInTheDocument();
});
