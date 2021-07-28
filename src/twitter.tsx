import React from "react";
import type { LinkProps } from "types";

export const twitterRegex = /@([\w_]+)/;

export const TwitterComponent: React.FC<LinkProps> = ({ match, className }) => {
  return (
    <a
      className={className}
      href={"https://twitter.com/" + match.slice(1)}
      target="_blank"
      rel="noreferrer"
    >
      {match}
    </a>
  );
};
