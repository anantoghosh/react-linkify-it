import React from "react";
import type { ReactJiraLinkProps } from "../types";

/**
 * JiraComponent
 *
 * React component that renders a clickable Jira ticket link.
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
