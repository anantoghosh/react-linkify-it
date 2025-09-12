import type { ReactNode } from 'react';

/**
 * Props for a generic link component.
 * @typedef {object} LinkProps
 * @property {string} match - String that matched the regex
 * @property {string} [className] - Optional class which is passed to the linked component
 */
export interface LinkProps {
  match: string;
  className?: string;
}

/**
 * Props for a higher-order component link wrapper.
 * @typedef {object} HOCLinkProps
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface HOCLinkProps {
  className?: string;
}

/**
 * Props for a Jira link component.
 * @typedef {object} JiraLinkProps
 * @property {string} match - Jira ticket key
 * @property {string} domain - Jira base url
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface JiraLinkProps extends LinkProps {
  domain: string;
}

/**
 * Props for a higher-order Jira link component.
 * @typedef {object} JiraHOCLinkProps
 * @property {string} domain - Jira base url
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface JiraHOCLinkProps extends HOCLinkProps {
  domain: string;
}

/**
 * React component type for a generic link.
 * @typedef {React.FC<React.PropsWithChildren<LinkProps>>} ReactLinkProps
 */
export type ReactLinkProps = React.FC<React.PropsWithChildren<LinkProps>>;

/**
 * React component type for the generic LinkIt component.
 * @typedef {React.FC<React.PropsWithChildren<{component: Component, regex: RegExp}>>} ReactLinkItProps
 */
export type ReactLinkItProps = React.FC<
  React.PropsWithChildren<{
    component: Component;
    regex: RegExp;
  }>
>;

/**
 * React component type for a higher-order link wrapper.
 * @typedef {React.FC<React.PropsWithChildren<HOCLinkProps>>} ReactHOCLinkProps
 */
export type ReactHOCLinkProps = React.FC<React.PropsWithChildren<HOCLinkProps>>;

/**
 * React component type for a Jira link.
 * @typedef {React.FC<React.PropsWithChildren<JiraLinkProps>>} ReactJiraLinkProps
 */
export type ReactJiraLinkProps = React.FC<
  React.PropsWithChildren<JiraLinkProps>
>;

/**
 * React component type for a higher-order Jira link wrapper.
 * @typedef {React.FC<React.PropsWithChildren<JiraHOCLinkProps>>} ReactJiraHOCLinkProps
 */
export type ReactJiraHOCLinkProps = React.FC<
  React.PropsWithChildren<JiraHOCLinkProps>
>;

/**
 * Function receives matched string and key to be used for loop, must return a React component
 */
export type Component = (match: string, key: number) => ReactNode;

// Export the internal interfaces for external use if needed
export type { HOCLinkProps, JiraLinkProps, JiraHOCLinkProps };
