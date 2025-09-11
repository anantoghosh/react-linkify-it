import React from "react";
import type { LinkProps } from "../types";

/**
 * EmailComponent
 *
 * React component that renders a clickable email link.
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
