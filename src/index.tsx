// Core linkification function
export { linkIt } from './utils/linkIt';

// Components
export {
  LinkIt,
  LinkItUrl,
  LinkItEmail,
  LinkItTwitter,
  LinkItHashtag,
  LinkItMention,
  UrlComponent,
  EmailComponent,
  TwitterComponent,
  HashTagComponent,
  MentionComponent,
} from './components';

// Regex patterns for direct use
export {
  urlRegex,
  emailRegex,
  twitterRegex,
  hashtagRegex,
  mentionRegex,
} from './utils/regexPatterns';

// Types
export type {
  LinkProps,
  ReactLinkProps,
  ReactLinkItProps,
  ReactHOCLinkProps,
  ReactHashTagLinkProps,
  ReactHashTagHOCLinkProps,
  ReactMentionLinkProps,
  ReactMentionHOCLinkProps,
  Component,
} from './types';
