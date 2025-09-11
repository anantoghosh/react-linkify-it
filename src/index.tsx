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
 * Generic function to linkify any pattern in a string using a custom component.
 *
 * @param {string} text - The text to process.
 * @param {(match: string, key: string|number) => React.ReactNode} linkComponent - The component to wrap each match.
 * @param {RegExp} linkRegex - The regex pattern to match.
 * @returns {string | ReactNode[]} Array of React nodes with matches wrapped, or the original string if no matches.
 *
 * @example
 * ```jsx
 * import { linkIt } from 'react-linkify-it';
 *
 * const output = linkIt(
 *   "Contact me at example@gmail.com",
 *   (match, key) => <a href={`mailto:${match}`} key={key}>{match}</a>,
 *   /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
 * );
 * ```
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
 * LinkIt
 *
 * React component that can wrap around any React component to linkify any pattern using a custom regex and component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {(match: string, key: string|number) => React.ReactNode} props.component - The component to wrap each match.
 * @param {RegExp} props.regex - The regex pattern to match.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkIt } from 'react-linkify-it';
 *
 * <LinkIt
 *   component={(match, key) => <a href={match} key={key}>{match}</a>}
 *   regex={/www\.[a-z]+\.com/g}
 * >
 *   www.google.com<div>hi match_me</div>
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
 * LinkItUrl
 *
 * React component that linkifies URLs in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItUrl } from 'react-linkify-it';
 *
 * <LinkItUrl>
 *   Visit https://www.google.com for more info.
 * </LinkItUrl>
 * ```
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
 * LinkItTwitter
 *
 * React component that linkifies Twitter handles (e.g., @username) in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItTwitter } from 'react-linkify-it';
 *
 * <LinkItTwitter>
 *   Hello @anantoghosh!
 * </LinkItTwitter>
 * ```
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
 * LinkItJira
 *
 * React component that linkifies Jira ticket keys (e.g., PROJ-123) in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} props.domain - The Jira base URL.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItJira } from 'react-linkify-it';
 *
 * <LinkItJira domain="https://project.atlassian.net">
 *   Ticket: PROJ-123
 * </LinkItJira>
 * ```
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
 * LinkItEmail
 *
 * React component that linkifies email addresses in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItEmail } from 'react-linkify-it';
 *
 * <LinkItEmail>
 *   Contact: user@example.com
 * </LinkItEmail>
 * ```
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
