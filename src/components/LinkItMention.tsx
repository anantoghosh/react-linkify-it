import { Fragment } from 'react';
import type { ReactMentionHOCLinkProps } from '../types';
import { findText, mentionRegex } from '../utils';
import { MentionComponent } from './MentionComponent';

/**
 * LinkItMention
 *
 * React component that linkifies mentions in its children using a customizable URL template.
 * The mention (without @) will be inserted into the URL template where {mention} appears.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} props.urlTemplate - URL template with {mention} placeholder.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItMention } from 'react-linkify-it';
 *
 * // Link to Twitter profiles
 * <LinkItMention urlTemplate="https://twitter.com/{mention}">
 *   Thanks to @reactjs and @typescript for amazing tools!
 * </LinkItMention>
 * ```
 *
 * @example
 * ```jsx
 * // Link to GitHub profiles
 * <LinkItMention urlTemplate="https://github.com/{mention}">
 *   Shoutout to @octocat and @defunkt for GitHub!
 * </LinkItMention>
 * ```
 *
 * @example
 * ```jsx
 * // Link to custom user profiles
 * <LinkItMention urlTemplate="https://example.com/users/{mention}">
 *   Welcome @newuser and @johndoe to our platform!
 * </LinkItMention>
 * ```
 *
 * @example
 * ```jsx
 * // With custom styling
 * <LinkItMention
 *   urlTemplate="https://twitter.com/{mention}"
 *   className="mention-link"
 * >
 *   Great work @developer1 and @designer2 on this project!
 * </LinkItMention>
 * ```
 *
 * @example
 * ```jsx
 * // Discord-style mentions
 * <LinkItMention urlTemplate="https://discord.com/users/{mention}">
 *   @everyone check out what @moderator shared!
 * </LinkItMention>
 * ```
 */
export const LinkItMention: ReactMentionHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <MentionComponent
            key={key}
            match={match}
            urlTemplate={props.urlTemplate}
            className={props.className}
          />
        ),
        mentionRegex,
      )}
    </Fragment>
  );
};
