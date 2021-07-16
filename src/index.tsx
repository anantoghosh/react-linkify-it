import React, { Fragment, isValidElement, cloneElement } from "react";
import type { ReactNode, FunctionComponent } from "react";

/**
 * Optional configuration object
 */
interface Options {
  /**
   * Override the default `a` component with any React component.
   * @param url the matched url with protocol
   * @param text the matched url text
   * @param key a unique key, pass this key to your component
   * @param className passed via the `className` option
   * @returns a react component
   */
  component?: (
    url: string,
    text: string,
    key: string | number,
    className?: string
  ) => JSX.Element;
  /**
   * attaches className to the default `a` tag generated
   */
  className?: string;
  /**
   * regex used to match links
   */
  regex?: RegExp;
}

const defaultLinkComponent: NonNullable<Options["component"]> = (
  url,
  text,
  key,
  className
) => (
  <a
    className={className}
    key={key}
    href={url}
    target="_blank"
    rel="noreferrer"
  >
    {text}
  </a>
);

const defaultLinksRegex =
  /(https?:\/\/|www\.)([-\w.]+\/[\p{L}\p{Emoji}\p{Emoji_Component}!#$%&'"()*+,./\\:;=_?@[\]~-]*[^\s'",.;:\b)\]\}?]|(([\w-]+\.)+[\w-]+[\w\/-]))/u;

const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

let key = 0;
let getKey = () => ++key;
/**
 * Make urls clickable.
 * @param text Text to parse
 * @param options {@link Options}
 */
export function linkIt(text: string, options?: Options) {
  const linksRegex = options?.regex ?? defaultLinksRegex;
  const linkComponent = options?.component ?? defaultLinkComponent;
  const elements = [];
  let rest = text;

  while (true) {
    const match = linksRegex.exec(rest);
    if (!match || match[0] === undefined) break;

    const urlStartIndex = match.index;
    const urlEndIndex = match.index + match[0].length;

    const textBeforeMatch = rest.slice(0, urlStartIndex);
    const url = rest
      .slice(urlStartIndex, urlEndIndex)
      .replace(ctrlCharactersRegex, "");
    rest = rest.slice(urlEndIndex);
    textBeforeMatch && elements.push(textBeforeMatch);
    elements.push(
      linkComponent(
        /^www\./.exec(url) ? `http://${url}` : url,
        url,
        getKey(),
        options?.className
      )
    );
  }

  rest && elements.push(<Fragment key={getKey()}>{rest}</Fragment>);

  if (elements.length === 0) {
    return text;
  }

  return elements;
}

function findText(children: ReactNode, options?: Options): ReactNode {
  if (typeof children === "string") {
    return linkIt(children, options);
  }

  if (Array.isArray(children)) {
    return children.map((c) => findText(c, options));
  }

  if (
    isValidElement(children) &&
    children.props.children &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return cloneElement(
      children,
      { ...children.props, key: getKey() },
      findText(children.props.children, options)
    );
  }

  return children;
}

/**
 * LinkIt component can wrapped around any React component to linkify any
 * urls
 * @example
 * ```
 * <LinkIt>
 *  <div>Hello http://world.com</div>
 * </LinkIt>
 * ```
 */
export const LinkIt: FunctionComponent<{ options?: Options }> = (props) => {
  return <Fragment>{findText(props.children, props.options)}</Fragment>;
};
