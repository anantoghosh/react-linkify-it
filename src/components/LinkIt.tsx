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
 * // Example: Linkify all '@mentions' and link internally
 * import { LinkIt } from 'react-linkify-it';
 * // If using Next.js:
 * import Link from 'next/link';
 *
 * const mentionRegex = /@([\p{L}\p{N}_]+)/u;
 *
 * const App = () => (
 *   <div className="App">
 *     <LinkIt
 *       regex={mentionRegex}
 *       component={(match, key) => (
 *         <Link href={`/user/${encodeURIComponent(match.slice(1))}`} key={key}>
 *           {match}
 *         </Link>
 *       )}
 *     >
 *       Welcome '@anantoghosh' and '@ユーザー' to our app!
 *     </LinkIt>
 *   </div>
 * );
 * ```
 */
export const LinkIt: ReactLinkItProps = (props) => {
  return (
    <Fragment>
      {findText(props.children, props.component, props.regex)}
    </Fragment>
  );
};
