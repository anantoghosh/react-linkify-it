// Core linkification function
export { linkIt } from './utils/linkIt';

// Components
export {
  LinkIt,
  LinkItUrl,
  LinkItEmail,
  LinkItTwitter,
  LinkItJira,
  UrlComponent,
  EmailComponent,
  TwitterComponent,
  JiraComponent,
} from './components';

// Regex patterns for direct use
export {
  urlRegex,
  emailRegex,
  twitterRegex,
  jiraRegex,
} from './utils/regexPatterns';

// Types
export type {
  LinkProps,
  ReactLinkProps,
  ReactLinkItProps,
  ReactHOCLinkProps,
  ReactJiraLinkProps,
  ReactJiraHOCLinkProps,
  Component,
} from './types';
