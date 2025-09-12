import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import type { Component } from '../types';
import { ctrlCharactersRegex } from './ctrlCharactersRegex';
import { getKey } from './getKey';

/**
 * Generic function to linkify any pattern in a string using a custom component.
 *
 * @param {string} text - The text to process.
 * @param {(match: string, key: string|number) => React.ReactNode} linkComponent - The component to wrap each match.
 * @param {RegExp} linkRegex - The regex pattern to match.
 * @returns {string | ReactNode[]} Array of React nodes with matches wrapped, or the original string if no matches.
 *
 * @example
 * ```jsx
 * import { linkIt } from 'react-linkify-it';
 *
 * const output = linkIt(
 *   "Contact me at example@gmail.com",
 *   (match, key) => <a href={`mailto:${match}`} key={key}>{match}</a>,
 *   /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
 * );
 * ```
 */
export function linkIt(
  text: string,
  linkComponent: Component,
  linkRegex: RegExp,
): string | ReactNode[] {
  const elements: ReactNode[] = [];
  let rest = text;

  while (true) {
    const match = linkRegex.exec(rest);
    if (!match || match[0] === undefined) break;

    const urlStartIndex = match.index;
    const urlEndIndex = match.index + match[0].length;

    const textBeforeMatch = rest.slice(0, urlStartIndex);
    const url = rest
      .slice(urlStartIndex, urlEndIndex)
      .replace(ctrlCharactersRegex, '');
    rest = rest.slice(urlEndIndex);
    if (textBeforeMatch) {
      elements.push(textBeforeMatch);
    }
    elements.push(linkComponent(url, getKey()));
  }

  if (rest) {
    elements.push(<Fragment key={getKey()}>{rest}</Fragment>);
  }

  if (elements.length === 0) {
    return text;
  }

  return elements;
}
