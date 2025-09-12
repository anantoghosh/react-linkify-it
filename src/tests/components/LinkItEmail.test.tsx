import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItEmail } from '../../components/LinkItEmail';

test('LinkItEmail renders basic email links', () => {
  render(<LinkItEmail>Contact user@example.com</LinkItEmail>);

  const link = screen.getByRole('link', { name: 'user@example.com' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'mailto:user@example.com');
});

test('LinkItEmail handles multiple emails in text', () => {
  render(
    <LinkItEmail>Email admin@example.com or support@example.org</LinkItEmail>,
  );

  expect(
    screen.getByRole('link', { name: 'admin@example.com' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'support@example.org' }),
  ).toBeInTheDocument();
});

test('LinkItEmail handles complex email formats', () => {
  render(<LinkItEmail>Contact test.email+tag@sub.domain.co.uk</LinkItEmail>);

  const link = screen.getByRole('link', {
    name: 'test.email+tag@sub.domain.co.uk',
  });
  expect(link).toHaveAttribute(
    'href',
    'mailto:test.email+tag@sub.domain.co.uk',
  );
});

test('LinkItEmail applies custom className', () => {
  render(
    <LinkItEmail className="email-link">Email user@example.com</LinkItEmail>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('email-link');
});

test('LinkItEmail filters control characters from emails', () => {
  render(<LinkItEmail>Email user@example.com works</LinkItEmail>);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', 'mailto:user@example.com');
  expect(link).toHaveTextContent('user@example.com');
});

test('LinkItEmail preserves non-email text', () => {
  render(<LinkItEmail>Before user@example.com after</LinkItEmail>);

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'user@example.com' }),
  ).toBeInTheDocument();
});

test('LinkItEmail returns text unchanged when no emails found', () => {
  render(<LinkItEmail>This is just plain text</LinkItEmail>);

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItEmail handles nested React elements', () => {
  render(
    <LinkItEmail>
      <div>
        Contact <span>admin@example.com</span> today
      </div>
    </LinkItEmail>,
  );

  const link = screen.getByRole('link', { name: 'admin@example.com' });
  expect(link).toBeInTheDocument();
});

test('LinkItEmail ignores emails inside anchor tags', () => {
  render(
    <LinkItEmail>
      <a href="mailto:existing@example.com">user@example.com</a>
    </LinkItEmail>,
  );

  // Only the existing link should be present
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute('href', 'mailto:existing@example.com');
});

test('LinkItEmail handles Unicode emails', () => {
  render(<LinkItEmail>Email δοκιμή@παράδειγμα.δοκιμή</LinkItEmail>);

  const link = screen.getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'mailto:δοκιμή@παράδειγμα.δοκιμή');
});
