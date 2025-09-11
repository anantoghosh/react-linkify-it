import React, { Fragment } from "react";
import type { ReactHOCLinkProps } from "../types";
import { findText, twitterRegex } from "../utils";
import { TwitterComponent } from "./TwitterComponent";

/**
 * LinkItTwitter
 *
 * React component that linkifies Twitter handles (e.g., @username) in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItTwitter } from 'react-linkify-it';
 *
 * <LinkItTwitter>
 *   Hello @anantoghosh!
 * </LinkItTwitter>
 * ```
 */
export const LinkItTwitter: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <TwitterComponent
            key={key}
            match={match}
            className={props.className}
          />
        ),
        twitterRegex,
      )}
    </Fragment>
  );
};
