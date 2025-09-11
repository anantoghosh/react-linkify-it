import React from "react";
import type { LinkProps } from "types";


/**
 * Regex to match URLs (http, https, www).
 * @type {RegExp}
 * @example
 *   urlRegex.test('https://google.com') // true
 */
export const urlRegex =
  /(https?:\/\/|www\.)[^\s<>'"()[\]{}]+[^\s<>'"()[\]{}.,;:!?\])}]/u;

/**
 * UrlComponent
 *
 * React component that automatically linkifies URLs in its children.
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
