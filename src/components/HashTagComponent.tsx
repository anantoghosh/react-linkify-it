import React from 'react';
import type { LinkProps } from '../types';

/**
 * Props for a hashtag link component.
 * @typedef {object} HashTagLinkProps
 * @property {string} match - Hashtag string that matched the regex
 * @property {string} urlTemplate - URL template with {hashtag} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface HashTagLinkProps extends LinkProps {
  urlTemplate: string;
}

/**
 * HashTagComponent
 *
 * React component that renders a clickable hashtag link.
 * The hashtag is inserted into the URL template where {hashtag} appears.
 *
 * @param {object} props
 * @param {string} props.match - The matched hashtag string (including #).
 * @param {string} props.urlTemplate - URL template with {hashtag} placeholder.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { HashTagComponent } from 'react-linkify-it';
 * <HashTagComponent
 *   match="#javascript"
 *   urlTemplate="https://x.com/hashtag/{hashtag}"
 * />
 * // Renders: <a href="https://x.com/hashtag/javascript">#javascript</a>
 * ```
 *
 * @example
 * ```jsx
 * // Custom social platform
 * <HashTagComponent
 *   match="#react"
 *   urlTemplate="https://example.com/tags/{hashtag}"
 * />
 * // Renders: <a href="https://example.com/tags/react">#react</a>
 * ```
 */
export const HashTagComponent: React.FC<
  React.PropsWithChildren<HashTagLinkProps>
> = ({ match: hashtag, urlTemplate, className }) => {
  // Extract hashtag without the # symbol
  const hashtagWithoutSymbol = hashtag.slice(1);

  // Replace {hashtag} placeholder in the URL template
  const href = urlTemplate.replace(
    '{hashtag}',
    encodeURIComponent(hashtagWithoutSymbol),
  );

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {hashtag}
    </a>
  );
};
