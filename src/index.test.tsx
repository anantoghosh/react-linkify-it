import { test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  LinkIt,
  linkIt,
  LinkItEmail,
  LinkItJira,
  LinkItTwitter,
  LinkItUrl,
  LinkItHashtag,
  LinkItMention,
} from './index';
import { UrlComponent, urlRegex } from './index';

const renderWithId = (child: string | React.ReactNode[]) =>
  render(<div data-testid={'linkIt'}>{child}</div>);

const base_urls = [
  'example.com',
  'example.com.org/yahoo',
  'example.com.org/yahoo/download',
  'example.com/arst/arst',
  'example.com/aards/#@3235235',
  'example.com/👨',
  'example.com/rst\u311Duct',
  'example.com/❤/#@323👨5',
  'testing-library.com/docs/queries/about/#textmatch',
  'ko.wikipedia.org/w/index.php?title=특수:DownloadAsPdf&page=위키백과%3A파일_올리기&action=show-download-screen',
  'typescriptlang.org/docs/handbook/2/template-literal-types.html',
  'google.com/search?client=trsb&q=typescrip+template+literal&sourceid=tws&ie=UTF-8&oe=UTF-8',
  'google.com/search?q=.rst👩👩&client=tfs&hs=DhQ&ei=4JrG-lqq=.rst👩👩&gs_lcp=Cgdnd3MQjAAQE&sclient=gws-wiz&ved=0aDCBA',
];

const valid_urls: string[] = [];
for (const url of base_urls) {
  valid_urls.push(`www.${url}`);
  valid_urls.push(`http://www.${url}`);
  valid_urls.push(`https://www.${url}`);
  valid_urls.push(`http://${url}`);
  valid_urls.push(`https://${url}`);
  valid_urls.push(`www.${url}/`);
  valid_urls.push(`http://www.${url}/`);
  valid_urls.push(`https://www.${url}/`);
  valid_urls.push(`http://${url}/`);
  valid_urls.push(`https://${url}/`);
  valid_urls.push(`https://${url}?hl=zh-CN`);
}

const texts = [
  (url: string) => `${url}`,
  (url: string) => `  ${url}  `,
  (url: string) => `hello there ${url} how are you?`,
  (url: string) => `hello there ${url}. how are you?`,
  (url: string) => `hello there ${url}, how are you?`,
  (url: string) => `hello there ${url}; how are you?`,
  (url: string) => `hello there ${url}: how are you?`,
  (url: string) => `hello there (${url}) how are you?`,
  (url: string) => `hello there {${url}} how are you?`,
  (url: string) => `hello there [${url}] how are you?`,
  (url: string) => `hello there "${url}" how are you?`,
  (url: string) => `hello there '${url}' how are you?`,
];

const input: { urls: string[]; text: string }[] = [];

for (const url of valid_urls) {
  for (const text of texts) {
    input.push({ urls: [url], text: text(url) });
  }
}

test.each(input)('$text', async ({ urls, text }) => {
  const output = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  renderWithId(output);
  expect(screen.getByTestId('linkIt')).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });

  for (const url of urls) {
    expect(screen.getByRole('link', { name: url })).toHaveAttribute(
      'href',
      /^www\./.exec(url) ? `http://${url}` : url,
    );
  }
});

test('Empty', () => {
  const text = `    .    `;
  const output = linkIt(
    text,
    (match, key) => <UrlComponent key={key} match={match} />,
    urlRegex,
  );

  renderWithId(output);

  expect(screen.getByTestId('linkIt')).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });
});

test('Filter control characters', () => {
  const text = `https://www.example.com/arst\u200Darst`;
  const filteredText = `https://www.example.com/arstarst`;
  const output = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  renderWithId(output);

  expect(screen.getByTestId('linkIt')).toHaveTextContent(filteredText, {
    normalizeWhitespace: false,
  });

  expect(screen.getByRole('link', { name: filteredText })).toHaveAttribute(
    'href',
    filteredText,
  );
});

test('LinkIt', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      www.google.com<div>hi</div>
    </LinkIt>,
  );
  expect(screen.getByRole('link', { name: 'www.google.com' })).toHaveAttribute(
    'href',
    'http://www.google.com',
  );
});

test('LinkItUrl', () => {
  render(
    <LinkItUrl>
      www.google.com<div>hi</div>
    </LinkItUrl>,
  );
  expect(screen.getByRole('link', { name: 'www.google.com' })).toHaveAttribute(
    'href',
    'http://www.google.com',
  );
});

test('LinkItUrl Empty', () => {
  render(<LinkItUrl></LinkItUrl>);
  expect(screen.queryByRole('link')).toBeNull();
});

test('LinkItParam', () => {
  render(
    <LinkItUrl>
      https://www.google.com?this=hello<div>hi</div>
    </LinkItUrl>,
  );
  expect(
    screen.getByRole('link', { name: 'https://www.google.com?this=hello' }),
  ).toHaveAttribute('href', 'https://www.google.com?this=hello');
});

test('LinkItUrl to have className', () => {
  render(
    <LinkItUrl className="hello">
      www.google.com<div>hi</div>
    </LinkItUrl>,
  );
  expect(screen.getByRole('link', { name: 'www.google.com' })).toHaveAttribute(
    'class',
    'hello',
  );
});

test('LinkItJira', () => {
  render(
    <LinkItJira domain="https://projectid.atlassian.net">
      hello AMM-123 ticket
    </LinkItJira>,
  );
  expect(screen.getByRole('link', { name: 'AMM-123' })).toHaveAttribute(
    'href',
    'https://projectid.atlassian.net/jira/software/projects/AMM/boards/123',
  );
});

test('LinkItTwitter', () => {
  render(<LinkItTwitter>hello @anantoghosh twitter</LinkItTwitter>);
  expect(screen.getByRole('link', { name: '@anantoghosh' })).toHaveAttribute(
    'href',
    'https://x.com/anantoghosh',
  );
});

test('LinkItEmail', () => {
  render(<LinkItEmail>hello hello.man@gmail.com twitter</LinkItEmail>);
  expect(
    screen.getByRole('link', { name: 'hello.man@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:hello.man@gmail.com');
});

// LinkItHashtag Tests
test('LinkItHashtag basic functionality', () => {
  render(
    <LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
      Check out #javascript and #react!
    </LinkItHashtag>
  );

  expect(screen.getByRole('link', { name: '#javascript' })).toHaveAttribute(
    'href',
    'https://twitter.com/hashtag/javascript'
  );
  expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
    'href',
    'https://twitter.com/hashtag/react'
  );
});

test('LinkItHashtag with Unicode hashtags', () => {
  render(
    <LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
      Love #café and #日本語 hashtags!
    </LinkItHashtag>
  );

  expect(screen.getByRole('link', { name: '#café' })).toHaveAttribute(
    'href',
    'https://example.com/tags/caf%C3%A9'
  );
  expect(screen.getByRole('link', { name: '#日本語' })).toHaveAttribute(
    'href',
    'https://example.com/tags/%E6%97%A5%E6%9C%AC%E8%AA%9E'
  );
});

test('LinkItHashtag with custom className', () => {
  render(
    <LinkItHashtag
      urlTemplate="https://instagram.com/explore/tags/{hashtag}"
      className="hashtag-link"
    >
      #photography is amazing!
    </LinkItHashtag>
  );

  expect(screen.getByRole('link', { name: '#photography' })).toHaveAttribute(
    'class',
    'hashtag-link'
  );
  expect(screen.getByRole('link', { name: '#photography' })).toHaveAttribute(
    'href',
    'https://instagram.com/explore/tags/photography'
  );
});

test('LinkItHashtag with special characters in URL template', () => {
  render(
    <LinkItHashtag urlTemplate="https://example.com/search?tag={hashtag}&type=post">
      Discussing #AI trends
    </LinkItHashtag>
  );

  expect(screen.getByRole('link', { name: '#AI' })).toHaveAttribute(
    'href',
    'https://example.com/search?tag=AI&type=post'
  );
});

test('LinkItHashtag empty content', () => {
  render(<LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}"></LinkItHashtag>);
  expect(screen.queryByRole('link')).toBeNull();
});

test('LinkItHashtag no hashtags in content', () => {
  render(
    <LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
      This text has no hashtags at all.
    </LinkItHashtag>
  );
  expect(screen.queryByRole('link')).toBeNull();
});

// LinkItMention Tests
test('LinkItMention basic functionality', () => {
  render(
    <LinkItMention urlTemplate="https://twitter.com/{mention}">
      Thanks to @reactjs and @typescript team!
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@reactjs' })).toHaveAttribute(
    'href',
    'https://twitter.com/reactjs'
  );
  expect(screen.getByRole('link', { name: '@typescript' })).toHaveAttribute(
    'href',
    'https://twitter.com/typescript'
  );
});

test('LinkItMention with GitHub profile linking', () => {
  render(
    <LinkItMention urlTemplate="https://github.com/{mention}">
      Shoutout to @octocat and @defunkt for GitHub!
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@octocat' })).toHaveAttribute(
    'href',
    'https://github.com/octocat'
  );
  expect(screen.getByRole('link', { name: '@defunkt' })).toHaveAttribute(
    'href',
    'https://github.com/defunkt'
  );
});

test('LinkItMention with Unicode usernames', () => {
  render(
    <LinkItMention urlTemplate="https://example.com/users/{mention}">
      Welcome @utilisateur and @ユーザー to our platform!
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@utilisateur' })).toHaveAttribute(
    'href',
    'https://example.com/users/utilisateur'
  );
  expect(screen.getByRole('link', { name: '@ユーザー' })).toHaveAttribute(
    'href',
    'https://example.com/users/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC'
  );
});

test('LinkItMention with custom className', () => {
  render(
    <LinkItMention
      urlTemplate="https://discord.com/users/{mention}"
      className="mention-link"
    >
      Great work @developer1!
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@developer1' })).toHaveAttribute(
    'class',
    'mention-link'
  );
  expect(screen.getByRole('link', { name: '@developer1' })).toHaveAttribute(
    'href',
    'https://discord.com/users/developer1'
  );
});

test('LinkItMention with underscores in username', () => {
  render(
    <LinkItMention urlTemplate="https://example.com/user/{mention}">
      Hello @user_name and @test_user_123!
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@user_name' })).toHaveAttribute(
    'href',
    'https://example.com/user/user_name'
  );
  expect(screen.getByRole('link', { name: '@test_user_123' })).toHaveAttribute(
    'href',
    'https://example.com/user/test_user_123'
  );
});

test('LinkItMention with special characters in URL template', () => {
  render(
    <LinkItMention urlTemplate="https://example.com/profile?user={mention}&tab=posts">
      Check out @johndoe profile
    </LinkItMention>
  );

  expect(screen.getByRole('link', { name: '@johndoe' })).toHaveAttribute(
    'href',
    'https://example.com/profile?user=johndoe&tab=posts'
  );
});

test('LinkItMention empty content', () => {
  render(<LinkItMention urlTemplate="https://twitter.com/{mention}"></LinkItMention>);
  expect(screen.queryByRole('link')).toBeNull();
});

test('LinkItMention no mentions in content', () => {
  render(
    <LinkItMention urlTemplate="https://twitter.com/{mention}">
      This text has no mentions at all.
    </LinkItMention>
  );
  expect(screen.queryByRole('link')).toBeNull();
});

test('LinkItMention and LinkItHashtag combined', () => {
  render(
    <div>
      <LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
        <LinkItMention urlTemplate="https://twitter.com/{mention}">
          Thanks @reactjs for #react! Check out #javascript too.
        </LinkItMention>
      </LinkItHashtag>
    </div>
  );

  expect(screen.getByRole('link', { name: '@reactjs' })).toHaveAttribute(
    'href',
    'https://twitter.com/reactjs'
  );
  expect(screen.getByRole('link', { name: '#react' })).toHaveAttribute(
    'href',
    'https://twitter.com/hashtag/react'
  );
  expect(screen.getByRole('link', { name: '#javascript' })).toHaveAttribute(
    'href',
    'https://twitter.com/hashtag/javascript'
  );
});
