import React from "react";
import type { LinkProps } from "types";

interface JiraLinkProps extends LinkProps {
  domain: string;
}

export const jiraRegex = /[A-Z]+-\d+/i;

export const JiraComponent: React.FC<JiraLinkProps> = ({
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
