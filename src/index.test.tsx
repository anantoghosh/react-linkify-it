import { test, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import {
  LinkIt,
  linkIt,
  LinkItEmail,
  LinkItJira,
  LinkItTwitter,
  LinkItUrl,
} from "./index";
import { UrlComponent, urlRegex } from "./url";

const renderWithId = (child: string | React.ReactNode[]) =>
  render(<div data-testid={"linkIt"}>{child}</div>);

const base_urls = [
  "example.com",
  "example.com.org/yahoo",
  "example.com.org/yahoo/download",
  "example.com/arst/arst",
  "example.com/aards/#@3235235",
  "example.com/👨",
  "example.com/rst\u311Duct",
  "example.com/❤/#@323👨5",
  "testing-library.com/docs/queries/about/#textmatch",
  "ko.wikipedia.org/w/index.php?title=특수:DownloadAsPdf&page=위키백과%3A파일_올리기&action=show-download-screen",
  "typescriptlang.org/docs/handbook/2/template-literal-types.html",
  "google.com/search?client=trsb&q=typescrip+template+literal&sourceid=tws&ie=UTF-8&oe=UTF-8",
  "google.com/search?q=.rst👩👩&client=tfs&hs=DhQ&ei=4JrG-lqq=.rst👩👩&gs_lcp=Cgdnd3MQjAAQE&sclient=gws-wiz&ved=0aDCBA",
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

test.each(input)("$text", async ({ urls, text }) => {
  const output = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  renderWithId(output);
  expect(screen.getByTestId("linkIt")).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });

  for (const url of urls) {
    expect(screen.getByRole("link", { name: url })).toHaveAttribute(
      "href",
      /^www\./.exec(url) ? `http://${url}` : url,
    );
  }
});

test("Empty", () => {
  const text = `    .    `;
  const output = linkIt(
    text,
    (match, key) => <UrlComponent key={key} match={match} />,
    urlRegex,
  );

  renderWithId(output);

  expect(screen.getByTestId("linkIt")).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });
});

test("Filter control characters", () => {
  const text = `https://www.example.com/arst\u200Darst`;
  const filteredText = `https://www.example.com/arstarst`;
  const output = linkIt(
    text,
    (match, key) => <UrlComponent match={match} key={key} />,
    urlRegex,
  );

  renderWithId(output);

  expect(screen.getByTestId("linkIt")).toHaveTextContent(filteredText, {
    normalizeWhitespace: false,
  });

  expect(screen.getByRole("link", { name: filteredText })).toHaveAttribute(
    "href",
    filteredText,
  );
});

test("LinkIt", () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      www.google.com<div>hi</div>
    </LinkIt>,
  );
  expect(screen.getByRole("link", { name: "www.google.com" })).toHaveAttribute(
    "href",
    "http://www.google.com",
  );
});

test("LinkItUrl", () => {
  render(
    <LinkItUrl>
      www.google.com<div>hi</div>
    </LinkItUrl>,
  );
  expect(screen.getByRole("link", { name: "www.google.com" })).toHaveAttribute(
    "href",
    "http://www.google.com",
  );
});

test("LinkItUrl to have className", () => {
  render(
    <LinkItUrl className="hello">
      www.google.com<div>hi</div>
    </LinkItUrl>,
  );
  expect(screen.getByRole("link", { name: "www.google.com" })).toHaveAttribute(
    "class",
    "hello",
  );
});

test("LinkItJira", () => {
  render(
    <LinkItJira domain="https://projectid.atlassian.net">
      hello AMM-123 ticket
    </LinkItJira>,
  );
  expect(screen.getByRole("link", { name: "AMM-123" })).toHaveAttribute(
    "href",
    "https://projectid.atlassian.net/jira/software/projects/AMM/boards/123",
  );
});

test("LinkItTwitter", () => {
  render(<LinkItTwitter>hello @anantoghosh twitter</LinkItTwitter>);
  expect(screen.getByRole("link", { name: "@anantoghosh" })).toHaveAttribute(
    "href",
    "https://twitter.com/anantoghosh",
  );
});

test("LinkItEmail", () => {
  render(<LinkItEmail>hello hello.man@gmail.com twitter</LinkItEmail>);
  expect(
    screen.getByRole("link", { name: "hello.man@gmail.com" }),
  ).toHaveAttribute("href", "mailto:hello.man@gmail.com");
});
