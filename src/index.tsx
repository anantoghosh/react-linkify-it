// Core linkification function
export { linkIt } from './utils/linkIt';

// Components
export {
  LinkIt,
  LinkItUrl,
  LinkItEmail,
  LinkItTwitter,
  LinkItJira,
  LinkItHashtag,
  LinkItMention,
  UrlComponent,
  EmailComponent,
  TwitterComponent,
  JiraComponent,
  HashTagComponent,
  MentionComponent,
} from './components';

// Regex patterns for direct use
export {
  urlRegex,
  emailRegex,
  twitterRegex,
  jiraRegex,
  hashtagRegex,
  mentionRegex,
} from './utils/regexPatterns';

// Types
export type {
  LinkProps,
  ReactLinkProps,
  ReactLinkItProps,
  ReactHOCLinkProps,
  ReactJiraLinkProps,
  ReactJiraHOCLinkProps,
  ReactHashTagLinkProps,
  ReactHashTagHOCLinkProps,
  ReactMentionLinkProps,
  ReactMentionHOCLinkProps,
  Component,
} from './types';
