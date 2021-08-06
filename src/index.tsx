import React, { Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import type { Component } from "./types";
import { UrlComponent, urlRegex } from "./url";
import { TwitterComponent, twitterRegex } from "./twitter";
import { JiraComponent, jiraRegex } from "./jira";
import { EmailComponent, emailRegex } from "./email";
import { getKey } from "./get-key";

const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

/**
 * Make urls clickable.
 * @param text Text to parse
 * @param options {@link Options}
 */
export function linkIt(
  text: string,
  linkComponent: Component,
  linkRegex: RegExp
): string | ReactNode[] {
  const elements: ReactNode[] = [];
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
    elements.push(linkComponent(url, getKey()));
  }

  rest && elements.push(<Fragment key={getKey()}>{rest}</Fragment>);

  if (elements.length === 0) {
    return text;
  }

  return elements;
}

function findText(
  children: ReactNode,
  component: Component,
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
  component: Component;
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
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <UrlComponent key={key} match={match} />
        ),
        urlRegex
      )}
    </Fragment>
  );
};

export const LinkItTwitter: React.FC = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <TwitterComponent key={key} match={match} />
        ),
        twitterRegex
      )}
    </Fragment>
  );
};

export const LinkItJira: React.FC<{ domain: string }> = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <JiraComponent key={key} match={match} domain={props.domain} />
        ),
        jiraRegex
      )}
    </Fragment>
  );
};

export const LinkItEmail: React.FC = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <EmailComponent key={key} match={match} />
        ),
        emailRegex
      )}
    </Fragment>
  );
};

export * from "./url";
export * from "./twitter";
export * from "./jira";
export * from "./email";
