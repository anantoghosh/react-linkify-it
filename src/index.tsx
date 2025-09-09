import React, { Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import type {
  Component,
  ReactHOCLinkProps,
  ReactJiraHOCLinkProps,
  ReactLinkItProps,
} from "./types";
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
 * @param linkComponent
 * @param linkRegex
 */
export function linkIt(
  text: string,
  linkComponent: Component,
  linkRegex: RegExp,
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
    if (textBeforeMatch) {
      elements.push(textBeforeMatch);
    }
    elements.push(linkComponent(url, getKey()));
  }

  if (rest) {
    elements.push(<Fragment key={getKey()}>{rest}</Fragment>);
  }

  if (elements.length === 0) {
    return text;
  }

  return elements;
}

function findText(
  children: ReactNode,
  component: Component,
  regex: RegExp,
): ReactNode {
  if (typeof children === "string") {
    return linkIt(children, component, regex);
  }

  if (Array.isArray(children)) {
    return children.map((c) => findText(c, component, regex));
  }

  if (
    isValidElement(children) &&
    typeof children.props === "object" &&
    children.props !== null &&
    "children" in children.props &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return cloneElement(
      children,
      { ...children.props, key: getKey() },
      findText(
        (children.props as { children: ReactNode }).children,
        component,
        regex,
      ),
    );
  }

  return children;
}

/**
 * LinkIt component can wrapped around any React component to linkify any
 * urls
 * @example
 * ```
 * <LinkIt
 *   component={(match, key) => <a href={match} key={key}>{match}</a>}
 *   regex={regexToMatch}
 * >
 *  www.google.com<div>hi match_me</div>
 * </LinkIt>
 * ```
 */
export const LinkIt: ReactLinkItProps = (props) => {
  return (
    <Fragment>
      {findText(props.children, props.component, props.regex)}
    </Fragment>
  );
};

/**
 * Link URLs
 */
export const LinkItUrl: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <UrlComponent key={key} match={match} className={props.className} />
        ),
        urlRegex,
      )}
    </Fragment>
  );
};

/**
 * Link Twitter handles
 */
export const LinkItTwitter: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <TwitterComponent
            key={key}
            match={match}
            className={props.className}
          />
        ),
        twitterRegex,
      )}
    </Fragment>
  );
};

/**
 * Link Jira tickets
 */
export const LinkItJira: ReactJiraHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <JiraComponent
            key={key}
            match={match}
            domain={props.domain}
            className={props.className}
          />
        ),
        jiraRegex,
      )}
    </Fragment>
  );
};

/**
 * Link Emails
 */
export const LinkItEmail: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <EmailComponent key={key} match={match} className={props.className} />
        ),
        emailRegex,
      )}
    </Fragment>
  );
};

export * from "./url";
export * from "./twitter";
export * from "./jira";
export * from "./email";
export * from "./types";
