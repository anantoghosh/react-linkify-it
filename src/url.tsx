import React from "react";
import type { LinkProps } from "types";

export const urlRegex =
  /(https?:\/\/|www\.)([-\w.]+\/[\p{L}\p{Emoji}\p{Emoji_Component}!#$%&'"()*+,./\\:;=_?@[\]~-]*[^\s'",.;:\b)\]}?]|(([\w-]+\.)+[\w-]+[\w/-]))/u;

export const UrlComponent: React.FC<React.PropsWithChildren<LinkProps>> = ({ match: url, className }) => {
  return (
    <a
      className={className}
      href={/^www\./.exec(url) ? `http://${url}` : url}
      target="_blank"
      rel="noreferrer"
    >
      {url}
    </a>
  );
};
