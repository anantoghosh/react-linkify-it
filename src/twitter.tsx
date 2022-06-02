import React from "react";
import type { ReactLinkProps } from "types";

export const twitterRegex = /\B@([\w_]+)/;

export const TwitterComponent: ReactLinkProps = ({ match, className }) => {
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
