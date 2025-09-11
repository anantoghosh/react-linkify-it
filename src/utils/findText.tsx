import { isValidElement, cloneElement } from "react";
import type { ReactNode } from "react";
import type { Component } from "../types";
import { getKey } from "./getKey";
import { linkIt } from "./linkIt";

/**
 * Recursively finds and processes text nodes in React children, applying linkification.
 *
 * @param {ReactNode} children - The React children to process.
 * @param {Component} component - The component to wrap matches with.
 * @param {RegExp} regex - The regex pattern to match.
 * @returns {ReactNode} The processed React node with linkified content.
 */
export function findText(
  children: ReactNode,
  component: Component,
  regex: RegExp,
): ReactNode {
  if (typeof children === "string") {
    return linkIt(children, component, regex);
  }

  if (Array.isArray(children)) {
    return children.map((c) => findText(c, component, regex));
  }

  if (
    isValidElement(children) &&
    typeof children.props === "object" &&
    children.props !== null &&
    "children" in children.props &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return cloneElement(
      children,
      { ...children.props, key: getKey() },
      findText(
        (children.props as { children: ReactNode }).children,
        component,
        regex,
      ),
    );
  }

  return children;
}
