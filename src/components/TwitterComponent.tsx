import React from "react";
import type { ReactLinkProps } from "../types";

/**
 * TwitterComponent
 *
 * React component that renders a clickable Twitter handle link.
 *
 * @param {object} props
 * @param {string} props.match - The matched Twitter handle.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { TwitterComponent } from 'react-linkify-it';
 * <TwitterComponent match="@anantoghosh" />
 * ```
 */
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
