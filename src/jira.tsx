import React from "react";
import type { JiraLinkProps } from "types";

export const jiraRegex = /[A-Z]+-\d+/i;

export const JiraComponent: React.FC<React.PropsWithChildren<JiraLinkProps>> = ({
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
