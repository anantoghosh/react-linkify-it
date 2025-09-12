import { Fragment } from 'react';
import type { ReactHashTagHOCLinkProps } from '../types';
import { findText, hashtagRegex } from '../utils';
import { HashTagComponent } from './HashTagComponent';

/**
 * LinkItHashtag
 *
 * React component that linkifies hashtags in its children using a customizable URL template.
 * The hashtag (without #) will be inserted into the URL template where {hashtag} appears.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} props.urlTemplate - URL template with {hashtag} placeholder.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItHashtag } from 'react-linkify-it';
 *
 * // Link to Twitter hashtags
 * <LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
 *   Check out #javascript and #react for web development!
 * </LinkItHashtag>
 * ```
 *
 * @example
 * ```jsx
 * // Link to Instagram hashtags
 * <LinkItHashtag urlTemplate="https://instagram.com/explore/tags/{hashtag}">
 *   Love this #sunset #photography 📸
 * </LinkItHashtag>
 * ```
 *
 * @example
 * ```jsx
 * // Link to custom platform
 * <LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
 *   Discussing #AI and #MachineLearning trends
 * </LinkItHashtag>
 * ```
 *
 * @example
 * ```jsx
 * // With custom styling
 * <LinkItHashtag
 *   urlTemplate="https://twitter.com/hashtag/{hashtag}"
 *   className="hashtag-link"
 * >
 *   Join the #OpenSource community! #coding #developers
 * </LinkItHashtag>
 * ```
 */
export const LinkItHashtag: ReactHashTagHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <HashTagComponent
            key={key}
            match={match}
            urlTemplate={props.urlTemplate}
            className={props.className}
          />
        ),
        hashtagRegex,
      )}
    </Fragment>
  );
};
