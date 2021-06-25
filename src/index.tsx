import React, { Fragment } from 'react';

/**
 * Optional configuration object
 */
interface Options {
  /**
   * Override the default `a` component with any React component.
   * @param url the matched url
   * @param key a unique key, pass this key to your component
   * @param className passed via the `className` option
   * @returns a react component
   */
  component?: (url: string, key: string, className?: string) => JSX.Element;
  /**
   * attaches className to the default `a` tag generated
   */
  className?: string;
  /**
   * regex used to match links
   */
  regex?: RegExp;
}

const defaultLinkComponent: NonNullable<Options['component']> = (
  url,
  key,
  className
) => (
  <a
    className={className}
    key={`${url}-${key}`}
    href={url}
    target="_blank"
    rel="noreferrer"
  >
    {url}
  </a>
);

const defaultLinksRegex =
  /(https?:\/\/|www\.)([-\w.]+\/[\p{L}\p{Emoji}\p{Emoji_Component}!#$%&'"()*+,./\\:;=_?@[\]~-]*[^\s'",.;:\b)\]\}?]|(([\w-]+\.)+[\w-]+[\w\/-]))/u;

const ctrlCharactersRegex = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

/**
 * Make urls clickable.
 * @param text Text to parse
 * @param options {@link Options}
 */
export default function addLinks(text: string, options?: Options) {
  const linksRegex = options?.regex ?? defaultLinksRegex;
  const linkComponent = options?.component ?? defaultLinkComponent;
  const elements = [];
  let rest = text;
  let key = 1;

  while (true) {
    const match = linksRegex.exec(rest);
    if (!match || match[0] === undefined) break;

    const urlStartIndex = match.index;
    const urlEndIndex = match.index + match[0].length;

    const textBeforeMatch = rest.slice(0, urlStartIndex);
    const url = rest
      .slice(urlStartIndex, urlEndIndex)
      .replace(ctrlCharactersRegex, '');
    rest = rest.slice(urlEndIndex);

    elements.push(
      <Fragment key={`${key}`}>{textBeforeMatch}</Fragment>,
      linkComponent(url, `${key}`, options?.className)
    );
    key = key + 1;
  }

  elements.push(<Fragment key={`${key}`}>{rest}</Fragment>);

  if (elements.length === 0) {
    return text;
  }

  return elements;
}
