import React from "react";
import type { ReactJiraLinkProps } from "types";


/**
 * Regex to match Jira ticket keys (e.g., ABC-123).
 * @type {RegExp}
 * @example
 *   jiraRegex.test('PROJ-42') // true
 */
export const jiraRegex = /[A-Z]+-\d+/i;

/**
 * JiraComponent
 *
 * React component that linkifies Jira ticket keys.
 *
 * @param {object} props
 * @param {string} props.match - The matched Jira ticket key.
 * @param {string} props.domain - The Jira base URL.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { JiraComponent } from 'react-linkify-it';
 * <JiraComponent match="PROJ-42" domain="https://project.atlassian.net" />
 * ```
 */
export const JiraComponent: ReactJiraLinkProps = ({
  match,
  domain,
  className,
}) => {
  const [project, id] = match.split("-");
  return (
    <a
      className={className}
      href={`${domain}/jira/software/projects/${project}/boards/${id}`}
      target="_blank"
      rel="noreferrer"
    >
      {match}
    </a>
  );
};
