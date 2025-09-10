import React from "react";
import type { LinkProps } from "types";

export const urlRegex =
  /(https?:\/\/|www\.)[^\s<>'"()[\]{}]+[^\s<>'"()[\]{}.,;:!?\])}]/u;

export const UrlComponent: React.FC<React.PropsWithChildren<LinkProps>> = ({
  match: url,
  className,
}) => {
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
