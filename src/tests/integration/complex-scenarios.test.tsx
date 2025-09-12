import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  LinkItUrl,
  LinkItEmail,
  LinkItTwitter,
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
  render(
    <div>
      <LinkItUrl className="url-class">https://example.com</LinkItUrl>
      <LinkItEmail className="email-class">user@example.com</LinkItEmail>
      <LinkItTwitter className="twitter-class">@username</LinkItTwitter>
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
  render(
    <div>
      <LinkItUrl>No URLs here</LinkItUrl>
      <LinkItEmail>No emails here</LinkItEmail>
      <LinkItTwitter>No mentions here</LinkItTwitter>
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
  expect(screen.getByText(/No mentions here/)).toBeInTheDocument();
  expect(screen.getByText(/No hashtags here/)).toBeInTheDocument();
});

test('Complex real-world example', () => {
  render(
    <div>
      <LinkItUrl>
        <LinkItEmail>
          <LinkItHashtag urlTemplate="https://x.com/hashtag/{hashtag}">
            <LinkItMention urlTemplate="https://github.com/{mention}">
              Hey @octocat, check out the new feature at
              https://example.com/feature! Contact support@company.com for
              issues. Tags: #opensource #javascript #react
            </LinkItMention>
          </LinkItHashtag>
        </LinkItEmail>
      </LinkItUrl>
    </div>,
  );

  const links = screen.getAllByRole('link');
  expect(links.length).toBeGreaterThan(4);

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
  expect(screen.getByRole('link', { name: '#opensource' })).toHaveAttribute(
    'href',
    'https://x.com/hashtag/opensource',
  );
});
