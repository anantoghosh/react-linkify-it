import React from "react";
import type { LinkProps } from "types";


/**
 * Regex to match email addresses.
 * @type {RegExp}
 * @example
 *   emailRegex.test('user@example.com') // true
 */
export const emailRegex =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

/**
 * EmailComponent
 *
 * React component that linkifies email addresses.
 *
 * @param {object} props
 * @param {string} props.match - The matched email address.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { EmailComponent } from 'react-linkify-it';
 * <EmailComponent match="user@example.com" />
 * ```
 */
export const EmailComponent: React.FC<React.PropsWithChildren<LinkProps>> = ({
  match,
  className,
}) => {
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
