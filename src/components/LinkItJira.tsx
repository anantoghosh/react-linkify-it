import React, { Fragment } from "react";
import type { ReactJiraHOCLinkProps } from "../types";
import { findText, jiraRegex } from "../utils";
import { JiraComponent } from "./JiraComponent";

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
