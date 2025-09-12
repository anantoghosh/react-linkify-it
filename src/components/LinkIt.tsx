import React, { Fragment } from 'react';
import type { ReactLinkItProps } from '../types';
import { findText } from '../utils';

/**
 * LinkIt
 *
 * React component that can wrap around any React component to linkify any pattern using a custom regex and component.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to linkify.
 * @param {(match: string, key: string|number) => React.ReactNode} props.component - The component to wrap each match.
 * @param {RegExp} props.regex - The regex pattern to match.
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * import { LinkIt } from 'react-linkify-it';
 *
 * <LinkIt
 *   component={(match, key) => <a href={match} key={key}>{match}</a>}
 *   regex={/www\.[a-z]+\.com/g}
 * >
 *   www.google.com<div>hi match_me</div>
 * </LinkIt>
 * ```
 */
export const LinkIt: ReactLinkItProps = (props) => {
  return (
    <Fragment>
      {findText(props.children, props.component, props.regex)}
    </Fragment>
  );
};
