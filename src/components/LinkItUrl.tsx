import React, { Fragment } from "react";
import type { ReactHOCLinkProps } from "../types";
import { findText, urlRegex } from "../utils";
import { UrlComponent } from "./UrlComponent";

/**
 * LinkItUrl
 *
 * React component that linkifies URLs in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItUrl } from 'react-linkify-it';
 *
 * <LinkItUrl>
 *   Visit https://www.google.com for more info.
 * </LinkItUrl>
 * ```
 */
export const LinkItUrl: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <UrlComponent key={key} match={match} className={props.className} />
        ),
        urlRegex,
      )}
    </Fragment>
  );
};
