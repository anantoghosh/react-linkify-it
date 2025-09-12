import React, { Fragment } from 'react';
import type { ReactHOCLinkProps } from '../types';
import { findText, emailRegex } from '../utils';
import { EmailComponent } from './EmailComponent';

/**
 * LinkItEmail
 *
 * React component that linkifies email addresses in its children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {string} [props.className] - Optional className for the anchor tag.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkItEmail } from 'react-linkify-it';
 *
 * <LinkItEmail>
 *   Contact: user@example.com
 * </LinkItEmail>
 * ```
 */
export const LinkItEmail: ReactHOCLinkProps = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <EmailComponent key={key} match={match} className={props.className} />
        ),
        emailRegex,
      )}
    </Fragment>
  );
};
