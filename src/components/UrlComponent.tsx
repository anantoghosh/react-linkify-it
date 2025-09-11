import React from "react";
import type { LinkProps } from "../types";

/**
 * UrlComponent
 *
 * React component that renders a clickable URL link.
 *
 * @param {object} props
 * @param {string} props.match - The matched URL string.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { UrlComponent } from 'react-linkify-it';
 * <UrlComponent match="https://google.com" />
 * ```
 */
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
