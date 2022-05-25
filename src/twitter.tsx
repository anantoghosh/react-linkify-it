import React from "react";
import type { LinkProps } from "types";

export const twitterRegex = /\B@([\w_]+)/;

export const TwitterComponent: React.FC<React.PropsWithChildren<LinkProps>> = ({ match, className }) => {
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
