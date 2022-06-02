import React from "react";
import type { ReactJiraLinkProps } from "types";

export const jiraRegex = /[A-Z]+-\d+/i;

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
