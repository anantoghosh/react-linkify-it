import React, { Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import { UrlComponent, urlRegex } from "./url";
import type { LinkProps } from "./types";

const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

let key = 0;
const getKey = () => ++key;
/**
 * Make urls clickable.
 * @param text Text to parse
 * @param options {@link Options}
 */
export function linkIt(
  text: string,
  LinkComponent: React.FC<LinkProps>,
  linkRegex: RegExp
): string | (string | JSX.Element)[] {
  const elements = [];
  let rest = text;

  while (true) {
    const match = linkRegex.exec(rest);
    if (!match || match[0] === undefined) break;

    const urlStartIndex = match.index;
    const urlEndIndex = match.index + match[0].length;

    const textBeforeMatch = rest.slice(0, urlStartIndex);
    const url = rest
      .slice(urlStartIndex, urlEndIndex)
      .replace(ctrlCharactersRegex, "");
    rest = rest.slice(urlEndIndex);
    textBeforeMatch && elements.push(textBeforeMatch);
    elements.push(<LinkComponent url={url} key={getKey()} />);
  }

  rest && elements.push(<Fragment key={getKey()}>{rest}</Fragment>);

  if (elements.length === 0) {
    return text;
  }

  return elements;
}

function findText(
  children: ReactNode,
  component: React.FC<LinkProps>,
  regex: RegExp
): ReactNode {
  if (typeof children === "string") {
    return linkIt(children, component, regex);
  }

  if (Array.isArray(children)) {
    return children.map((c) => findText(c, component, regex));
  }

  if (
    isValidElement(children) &&
    children.props.children &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return cloneElement(
      children,
      { ...children.props, key: getKey() },
      findText(children.props.children, component, regex)
    );
  }

  return children;
}

/**
 * LinkIt component can wrapped around any React component to linkify any
 * urls
 * @example
 * ```
 * <LinkIt>
 *  <div>Hello http://world.com</div>
 * </LinkIt>
 * ```
 */
export const LinkIt: React.FC<{
  component: React.FC<LinkProps>;
  regex: RegExp;
}> = (props) => {
  return (
    <Fragment>
      {findText(props.children, props.component, props.regex)}
    </Fragment>
  );
};

export const LinkItUrl: React.FC = (props) => {
  return (
    <Fragment>{findText(props.children, UrlComponent, urlRegex)}</Fragment>
  );
};

export * from "./url";
