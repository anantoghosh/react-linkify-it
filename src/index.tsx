import React, { Fragment } from 'react';

interface Options {
  component?: (url: string, key: string, className?: string) => JSX.Element;
  className?: string;
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
  /https?:\/\/[\w!#$%&'()*+,./:;=?@[\]~-]+\.[\w!#$%&'()*+,./:;=?@[\]~-]+[^\s,.:]/;

export function addLinks(text: string, options?: Options) {
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
    const url = rest.slice(urlStartIndex, urlEndIndex);
    rest = rest.slice(urlEndIndex);

    elements.push(
      <Fragment key={`${url}-${key}-1`}>{textBeforeMatch}</Fragment>,
      linkComponent(url, key.toString(), options?.className)
    );
    key = key + 1;
  }

  elements.push(<Fragment key={`${key}-1`}>{rest}</Fragment>);

  if (elements.length === 0) {
    return text;
  }

  return elements;
}
