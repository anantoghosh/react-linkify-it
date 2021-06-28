import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen } from "@testing-library/react";
import { addLinks } from "./index";

const renderWithId = (child: string | JSX.Element[]) =>
  render(<div data-testid={"addLinks"}>{child}</div>);

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

test.concurrent.each(input)("$text", async ({ urls, text }) => {
  const output = addLinks(text);

  renderWithId(output);
  expect(screen.getByTestId("addLinks")).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });

  for (const url of urls) {
    expect(screen.getByRole("link", { name: url })).toHaveAttribute(
      "href",
      /^www\./.exec(url) ? `http://${url}` : url
    );
  }
});

test("Empty", () => {
  const text = `    .    `;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId("addLinks")).toHaveTextContent(text, {
    normalizeWhitespace: false,
  });
});

test("Filter control characters", () => {
  const text = `https://www.example.com/arst\u200Darst`;
  const filteredText = `https://www.example.com/arstarst`;
  const output = addLinks(text);

  renderWithId(output);

  expect(screen.getByTestId("addLinks")).toHaveTextContent(filteredText, {
    normalizeWhitespace: false,
  });

  expect(screen.getByRole("link", { name: filteredText })).toHaveAttribute(
    "href",
    filteredText
  );
});
