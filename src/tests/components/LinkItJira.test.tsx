import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { LinkItJira } from '../../components/LinkItJira';

test('LinkItJira renders basic Jira ticket links with custom domain', () => {
  render(
    <LinkItJira domain="https://mycompany.atlassian.net">
      Check PROJ-123
    </LinkItJira>,
  );

  const link = screen.getByRole('link', { name: 'PROJ-123' });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute(
    'href',
    'https://mycompany.atlassian.net/jira/software/projects/PROJ/boards/123',
  );
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noreferrer');
});

test('LinkItJira handles multiple Jira tickets', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      Check PROJ-123 and DEV-456 tickets
    </LinkItJira>,
  );

  expect(screen.getByRole('link', { name: 'PROJ-123' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'DEV-456' })).toBeInTheDocument();
});

test('LinkItJira handles long project names', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      See LONGPROJECT-999
    </LinkItJira>,
  );

  const link = screen.getByRole('link', { name: 'LONGPROJECT-999' });
  expect(link).toHaveAttribute(
    'href',
    'https://company.atlassian.net/jira/software/projects/LONGPROJECT/boards/999',
  );
});

test('LinkItJira applies custom className', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net" className="jira-link">
      Check PROJ-123
    </LinkItJira>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveClass('jira-link');
});

test('LinkItJira filters control characters from tickets', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      Check PROJ-123 works
    </LinkItJira>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    'https://company.atlassian.net/jira/software/projects/PROJ/boards/123',
  );
  expect(link).toHaveTextContent('PROJ-123');
});

test('LinkItJira preserves non-ticket text', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      Before PROJ-123 after
    </LinkItJira>,
  );

  expect(screen.getByText(/Before/)).toBeInTheDocument();
  expect(screen.getByText(/after/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'PROJ-123' })).toBeInTheDocument();
});

test('LinkItJira returns text unchanged when no tickets found', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      This is just plain text
    </LinkItJira>,
  );

  expect(screen.getByText('This is just plain text')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('LinkItJira handles nested React elements', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      <div>
        Check <span>PROJ-123</span> today
      </div>
    </LinkItJira>,
  );

  const link = screen.getByRole('link', { name: 'PROJ-123' });
  expect(link).toBeInTheDocument();
});

test('LinkItJira ignores tickets inside anchor tags', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      <a href="https://jira.com/browse/EXISTING-123">PROJ-456</a>
    </LinkItJira>,
  );

  // Only the existing link should be present
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(1);
  expect(links[0]).toHaveAttribute(
    'href',
    'https://jira.com/browse/EXISTING-123',
  );
});

test('LinkItJira does not linkify invalid ticket formats', () => {
  render(
    <LinkItJira domain="https://company.atlassian.net">
      Check proj-123 or PROJ123 or PROJ-
    </LinkItJira>,
  );

  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(
    screen.getByText('Check proj-123 or PROJ123 or PROJ-'),
  ).toBeInTheDocument();
});
