import React from 'react';
import type { LinkProps } from '../types';

/**
 * Props for a mention link component.
 * @typedef {object} MentionLinkProps
 * @property {string} match - Mention string that matched the regex
 * @property {string} urlTemplate - URL template with {mention} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface MentionLinkProps extends LinkProps {
  urlTemplate: string;
}

/**
 * MentionComponent
 *
 * React component that renders a clickable mention link.
 * The mention is inserted into the URL template where {mention} appears.
 *
 * @param {object} props
 * @param {string} props.match - The matched mention string (including @).
 * @param {string} props.urlTemplate - URL template with {mention} placeholder.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { MentionComponent } from 'react-linkify-it';
 * <MentionComponent
 *   match="@username"
 *   urlTemplate="https://twitter.com/{mention}"
 * />
 * // Renders: <a href="https://twitter.com/username">@username</a>
 * ```
 *
 * @example
 * ```jsx
 * // GitHub profile linking
 * <MentionComponent
 *   match="@octocat"
 *   urlTemplate="https://github.com/{mention}"
 * />
 * // Renders: <a href="https://github.com/octocat">@octocat</a>
 * ```
 *
 * @example
 * ```jsx
 * // Custom platform with user profile pages
 * <MentionComponent
 *   match="@johndoe"
 *   urlTemplate="https://example.com/users/{mention}"
 * />
 * // Renders: <a href="https://example.com/users/johndoe">@johndoe</a>
 * ```
 */
export const MentionComponent: React.FC<React.PropsWithChildren<MentionLinkProps>> = ({
  match: mention,
  urlTemplate,
  className,
}) => {
  // Extract mention without the @ symbol
  const mentionWithoutSymbol = mention.slice(1);

  // Replace {mention} placeholder in the URL template
  const href = urlTemplate.replace('{mention}', encodeURIComponent(mentionWithoutSymbol));

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {mention}
    </a>
  );
};
