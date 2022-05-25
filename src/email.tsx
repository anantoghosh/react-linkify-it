import React from "react";
import type { LinkProps } from "types";

export const emailRegex =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export const EmailComponent: React.FC<React.PropsWithChildren<LinkProps>> = ({ match, className }) => {
  return (
    <a
      className={className}
      href={"mailto:" + match}
      target="_blank"
      rel="noreferrer"
    >
      {match}
    </a>
  );
};
