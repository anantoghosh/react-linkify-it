import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  LinkItUrl,
  LinkItEmail,
  LinkItTwitter,
  LinkItJira,
  LinkItHashtag,
  LinkItMention,
} from '../../components';

// LinkItUrl Tests
test('LinkItUrl processes URLs in text', () => {
  render(<LinkItUrl>Visit https://example.com and www.github.com</LinkItUrl>);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', 'https://example.com');
  expect(links[1]).toHaveAttribute('href', 'http://www.github.com');
});

test('LinkItUrl with className', () => {
  render(
    <LinkItUrl className="custom-url-class">
      Visit https://example.com
    </LinkItUrl>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'custom-url-class');
});

test('LinkItUrl with no URLs', () => {
  render(<LinkItUrl>This text has no URLs in it</LinkItUrl>);

  expect(screen.queryByRole('link')).toBeNull();
  expect(screen.getByText('This text has no URLs in it')).toBeInTheDocument();
});

test('LinkItUrl with complex URLs', () => {
  render(
    <LinkItUrl>Check https://example.com/path?param=value#section</LinkItUrl>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    'https://example.com/path?param=value#section',
  );
});

// LinkItEmail Tests
test('LinkItEmail processes emails in text', () => {
  render(
    <LinkItEmail>Contact me at user@example.com or admin@test.org</LinkItEmail>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', 'mailto:user@example.com');
  expect(links[1]).toHaveAttribute('href', 'mailto:admin@test.org');
});

test('LinkItEmail with className', () => {
  render(
    <LinkItEmail className="email-link">
      Email me at test@example.com
    </LinkItEmail>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'email-link');
});

test('LinkItEmail with Unicode emails', () => {
  render(<LinkItEmail>Contact δοκιμή@παράδειγμα.δοκιμή</LinkItEmail>);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', 'mailto:δοκιμή@παράδειγμα.δοκιμή');
});

// LinkItTwitter Tests
test('LinkItTwitter processes Twitter handles', () => {
  render(<LinkItTwitter>Follow @reactjs and @typescript</LinkItTwitter>);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', 'https://x.com/reactjs');
  expect(links[1]).toHaveAttribute('href', 'https://x.com/typescript');
});

test('LinkItTwitter with className', () => {
  render(
    <LinkItTwitter className="twitter-link">Follow @username</LinkItTwitter>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'twitter-link');
});

// LinkItJira Tests
test('LinkItJira processes Jira tickets', () => {
  const domain = 'https://company.atlassian.net';
  render(
    <LinkItJira domain={domain}>See tickets PROJ-123 and DEV-456</LinkItJira>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute(
    'href',
    `${domain}/jira/software/projects/PROJ/boards/123`,
  );
  expect(links[1]).toHaveAttribute(
    'href',
    `${domain}/jira/software/projects/DEV/boards/456`,
  );
});

test('LinkItJira with className', () => {
  const domain = 'https://company.atlassian.net';
  render(
    <LinkItJira domain={domain} className="jira-link">
      Ticket PROJ-123
    </LinkItJira>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'jira-link');
});

// LinkItHashtag Tests
test('LinkItHashtag processes hashtags', () => {
  const urlTemplate = 'https://twitter.com/hashtag/{hashtag}';
  render(
    <LinkItHashtag urlTemplate={urlTemplate}>
      Love #javascript and #react
    </LinkItHashtag>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute(
    'href',
    'https://twitter.com/hashtag/javascript',
  );
  expect(links[1]).toHaveAttribute('href', 'https://twitter.com/hashtag/react');
});

test('LinkItHashtag with className', () => {
  const urlTemplate = 'https://example.com/tags/{hashtag}';
  render(
    <LinkItHashtag urlTemplate={urlTemplate} className="hashtag-link">
      Check out #programming
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'hashtag-link');
});

test('LinkItHashtag with Unicode hashtags', () => {
  const urlTemplate = 'https://example.com/tags/{hashtag}';
  render(
    <LinkItHashtag urlTemplate={urlTemplate}>
      Japanese tag #日本語
    </LinkItHashtag>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    'https://example.com/tags/%E6%97%A5%E6%9C%AC%E8%AA%9E',
  );
});

// LinkItMention Tests
test('LinkItMention processes mentions', () => {
  const urlTemplate = 'https://github.com/{mention}';
  render(
    <LinkItMention urlTemplate={urlTemplate}>
      Thanks @octocat and @defunkt
    </LinkItMention>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', 'https://github.com/octocat');
  expect(links[1]).toHaveAttribute('href', 'https://github.com/defunkt');
});

test('LinkItMention with className', () => {
  const urlTemplate = 'https://example.com/user/{mention}';
  render(
    <LinkItMention urlTemplate={urlTemplate} className="mention-link">
      Hello @user
    </LinkItMention>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('class', 'mention-link');
});

test('LinkItMention with underscores and numbers', () => {
  const urlTemplate = 'https://example.com/user/{mention}';
  render(
    <LinkItMention urlTemplate={urlTemplate}>
      Contact @user_name_123
    </LinkItMention>,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute(
    'href',
    'https://example.com/user/user_name_123',
  );
});
