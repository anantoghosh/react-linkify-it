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

test('Multiple LinkIt components can be nested', () => {
  render(
    <div>
      <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
        <LinkItMention urlTemplate="https://x.com/{mention}">
          Thanks @reactjs for #react! Amazing work on #javascript too.
        </LinkItMention>
      </LinkItHashtag>
    </div>,
  );

  // Should find mention and hashtags
  expect(screen.getByRole('link', { name: '@reactjs' })).toHaveAttribute(
    'href',
    'https://x.com/reactjs',
  );
  expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
    'href',
    'https://x.com/hashtag/react',
  );
  expect(screen.getByRole('link', { name: '#javascript' })).toHaveAttribute(
    'href',
    'https://x.com/hashtag/javascript',
  );
});

test('Complex text with multiple patterns', () => {
  render(
    <div>
      <LinkItUrl>
        <LinkItEmail>
          <LinkItTwitter>
            Check out https://example.com, contact me at user@example.com, or
            follow @username on Twitter.
          </LinkItTwitter>
        </LinkItEmail>
      </LinkItUrl>
    </div>,
  );

  expect(
    screen.getByRole('link', { name: 'https://example.com' }),
  ).toHaveAttribute('href', 'https://example.com');
  expect(
    screen.getByRole('link', { name: 'user@example.com' }),
  ).toHaveAttribute('href', 'mailto:user@example.com');
  expect(screen.getByRole('link', { name: '@username' })).toHaveAttribute(
    'href',
    'https://x.com/username',
  );
});

test('LinkIt components work with React elements as children', () => {
  render(
    <LinkItUrl>
      <div>
        <p>Visit https://example.com for more info</p>
        <span>Also check www.github.com</span>
      </div>
    </LinkItUrl>,
  );

  expect(
    screen.getByRole('link', { name: 'https://example.com' }),
  ).toHaveAttribute('href', 'https://example.com');
  expect(screen.getByRole('link', { name: 'www.github.com' })).toHaveAttribute(
    'href',
    'http://www.github.com',
  );
});

test('LinkItJira with various ticket formats', () => {
  const domain = 'https://company.atlassian.net';
  render(
    <LinkItJira domain={domain}>
      See tickets PROJ-123, DEV-456, and FEATURE-789 for details. Also check
      BUGFIX-12345 and EPIC-1.
    </LinkItJira>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(5);

  expect(screen.getByRole('link', { name: 'PROJ-123' })).toHaveAttribute(
    'href',
    `${domain}/jira/software/projects/PROJ/boards/123`,
  );
  expect(screen.getByRole('link', { name: 'EPIC-1' })).toHaveAttribute(
    'href',
    `${domain}/jira/software/projects/EPIC/boards/1`,
  );
});

test('LinkItHashtag and LinkItMention with Unicode content', () => {
  render(
    <div>
      <LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
        <LinkItMention urlTemplate="https://example.com/users/{mention}">
          Japanese: @ユーザー loves #日本語 and #café discussions
        </LinkItMention>
      </LinkItHashtag>
    </div>,
  );

  expect(screen.getByRole('link', { name: '@ユーザー' })).toHaveAttribute(
    'href',
    'https://example.com/users/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC',
  );
  expect(screen.getByRole('link', { name: '#日本語' })).toHaveAttribute(
    'href',
    'https://example.com/tags/%E6%97%A5%E6%9C%AC%E8%AA%9E',
  );
  expect(screen.getByRole('link', { name: '#café' })).toHaveAttribute(
    'href',
    'https://example.com/tags/caf%C3%A9',
  );
});

test('All components with className propagation', () => {
  const domain = 'https://company.atlassian.net';
  render(
    <div>
      <LinkItUrl className="url-class">https://example.com</LinkItUrl>
      <LinkItEmail className="email-class">user@example.com</LinkItEmail>
      <LinkItTwitter className="twitter-class">@username</LinkItTwitter>
      <LinkItJira domain={domain} className="jira-class">
        PROJ-123
      </LinkItJira>
      <LinkItHashtag
        urlTemplate="https://example.com/tags/{hashtag}"
        className="hashtag-class"
      >
        #programming
      </LinkItHashtag>
      <LinkItMention
        urlTemplate="https://example.com/users/{mention}"
        className="mention-class"
      >
        @developer
      </LinkItMention>
    </div>,
  );

  expect(
    screen.getByRole('link', { name: 'https://example.com' }),
  ).toHaveAttribute('class', 'url-class');
  expect(
    screen.getByRole('link', { name: 'user@example.com' }),
  ).toHaveAttribute('class', 'email-class');
  expect(screen.getByRole('link', { name: '@username' })).toHaveAttribute(
    'class',
    'twitter-class',
  );
  expect(screen.getByRole('link', { name: 'PROJ-123' })).toHaveAttribute(
    'class',
    'jira-class',
  );
  expect(screen.getByRole('link', { name: '#programming' })).toHaveAttribute(
    'class',
    'hashtag-class',
  );
  expect(screen.getByRole('link', { name: '@developer' })).toHaveAttribute(
    'class',
    'mention-class',
  );
});

test('Components handle edge cases gracefully', () => {
  const domain = 'https://company.atlassian.net';
  render(
    <div>
      <LinkItUrl>No URLs here</LinkItUrl>
      <LinkItEmail>No emails here</LinkItEmail>
      <LinkItTwitter>No mentions here</LinkItTwitter>
      <LinkItJira domain={domain}>No tickets here</LinkItJira>
      <LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
        No hashtags here
      </LinkItHashtag>
      <LinkItMention urlTemplate="https://example.com/users/{mention}">
        No mentions here
      </LinkItMention>
    </div>,
  );

  expect(screen.queryByRole('link')).toBeNull();
  // Text may be split across elements, so check with regex
  expect(screen.getByText(/No URLs here/)).toBeInTheDocument();
  expect(screen.getByText(/No emails here/)).toBeInTheDocument();
  expect(screen.getByText(/No tickets here/)).toBeInTheDocument();
  expect(screen.getByText(/No hashtags here/)).toBeInTheDocument();
});

test('Complex real-world example', () => {
  const domain = 'https://mycompany.atlassian.net';
  render(
    <div>
      <LinkItUrl>
        <LinkItEmail>
          <LinkItJira domain={domain}>
            <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
              <LinkItMention urlTemplate="https://github.com/{mention}">
                Hey @octocat, check out the new feature at
                https://example.com/feature! Contact support@company.com for
                issues. Related ticket: PROJ-456 Tags: #opensource #javascript
                #react
              </LinkItMention>
            </LinkItHashtag>
          </LinkItJira>
        </LinkItEmail>
      </LinkItUrl>
    </div>,
  );

  const links = screen.getAllByRole('link');
  expect(links.length).toBeGreaterThan(5);

  // Verify each type of link is present and correctly formatted
  expect(screen.getByRole('link', { name: '@octocat' })).toHaveAttribute(
    'href',
    'https://github.com/octocat',
  );
  expect(
    screen.getByRole('link', { name: 'https://example.com/feature' }),
  ).toHaveAttribute('href', 'https://example.com/feature');
  expect(
    screen.getByRole('link', { name: 'support@company.com' }),
  ).toHaveAttribute('href', 'mailto:support@company.com');
  expect(screen.getByRole('link', { name: 'PROJ-456' })).toHaveAttribute(
    'href',
    `${domain}/jira/software/projects/PROJ/boards/456`,
  );
  expect(screen.getByRole('link', { name: '#opensource' })).toHaveAttribute(
    'href',
    'https://x.com/hashtag/opensource',
  );
});
