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
 * Props for a hashtag link component.
 * @typedef {object} HashTagLinkProps
 * @property {string} match - Hashtag string that matched the regex
 * @property {string} urlTemplate - URL template with {hashtag} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface HashTagLinkProps extends LinkProps {
  urlTemplate: string;
}

/**
 * Props for a mention link component.
 * @typedef {object} MentionLinkProps
 * @property {string} match - Mention string that matched the regex
 * @property {string} urlTemplate - URL template with {mention} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface MentionLinkProps extends LinkProps {
  urlTemplate: string;
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
 * Props for a higher-order hashtag link component.
 * @typedef {object} HashTagHOCLinkProps
 * @property {string} urlTemplate - URL template with {hashtag} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface HashTagHOCLinkProps extends HOCLinkProps {
  urlTemplate: string;
}

/**
 * Props for a higher-order mention link component.
 * @typedef {object} MentionHOCLinkProps
 * @property {string} urlTemplate - URL template with {mention} placeholder
 * @property {string} [className] - Optional class which is passed to the linked component
 */
interface MentionHOCLinkProps extends HOCLinkProps {
  urlTemplate: string;
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
 * React component type for a hashtag link.
 * @typedef {React.FC<React.PropsWithChildren<HashTagLinkProps>>} ReactHashTagLinkProps
 */
export type ReactHashTagLinkProps = React.FC<
  React.PropsWithChildren<HashTagLinkProps>
>;

/**
 * React component type for a mention link.
 * @typedef {React.FC<React.PropsWithChildren<MentionLinkProps>>} ReactMentionLinkProps
 */
export type ReactMentionLinkProps = React.FC<
  React.PropsWithChildren<MentionLinkProps>
>;

/**
 * React component type for a higher-order Jira link wrapper.
 * @typedef {React.FC<React.PropsWithChildren<JiraHOCLinkProps>>} ReactJiraHOCLinkProps
 */
export type ReactJiraHOCLinkProps = React.FC<
  React.PropsWithChildren<JiraHOCLinkProps>
>;

/**
 * React component type for a higher-order hashtag link wrapper.
 * @typedef {React.FC<React.PropsWithChildren<HashTagHOCLinkProps>>} ReactHashTagHOCLinkProps
 */
export type ReactHashTagHOCLinkProps = React.FC<
  React.PropsWithChildren<HashTagHOCLinkProps>
>;

/**
 * React component type for a higher-order mention link wrapper.
 * @typedef {React.FC<React.PropsWithChildren<MentionHOCLinkProps>>} ReactMentionHOCLinkProps
 */
export type ReactMentionHOCLinkProps = React.FC<
  React.PropsWithChildren<MentionHOCLinkProps>
>;

/**
 * Function receives matched string and key to be used for loop, must return a React component
 */
export type Component = (match: string, key: number) => ReactNode;

// Export the internal interfaces for external use if needed
export type {
  HOCLinkProps,
  JiraLinkProps,
  JiraHOCLinkProps,
  HashTagLinkProps,
  HashTagHOCLinkProps,
  MentionLinkProps,
  MentionHOCLinkProps,
};
