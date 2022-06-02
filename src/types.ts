export interface LinkProps {
  /** String that matched the regex */
  match: string;
  /** Optional class which is passed to the linked component */
  className?: string;
}

interface HOCLinkProps {
  /** Optional class which is passed to the linked component */
  className?: string;
}

interface JiraLinkProps extends LinkProps {
  /** Jira base url */
  domain: string;
}

interface JiraHOCLinkProps extends HOCLinkProps {
  /** Jira base url */
  domain: string;
}

export type ReactLinkProps = React.FC<React.PropsWithChildren<LinkProps>>;
export type ReactLinkItProps = React.FC<
  React.PropsWithChildren<{
    component: Component;
    regex: RegExp;
  }>
>;
export type ReactHOCLinkProps = React.FC<React.PropsWithChildren<HOCLinkProps>>;

export type ReactJiraLinkProps = React.FC<
  React.PropsWithChildren<JiraLinkProps>
>;
export type ReactJiraHOCLinkProps = React.FC<
  React.PropsWithChildren<JiraHOCLinkProps>
>;

/**
 * Function receives matched string and key to be used for loop, must return a React component
 */
export type Component = (match: string, key: number) => JSX.Element;
