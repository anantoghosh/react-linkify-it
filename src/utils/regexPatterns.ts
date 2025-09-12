/**
 * Regex to match URLs (http, https, www).
 * @type {RegExp}
 * @example
 *   urlRegex.test('https://google.com') // true
 */
export const urlRegex =
  /(https?:\/\/|www\.)[^\s<>'"()[\]{}]+[^\s<>'"()[\]{}.,;:!?\])}]/u;

/**
 * Regex to match email addresses.
 * @type {RegExp}
 * @example
 *   emailRegex.test('user@example.com') // true
 */
export const emailRegex =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

/**
 * Regex to match Twitter handles (e.g., @username).
 * @type {RegExp}
 * @example
 *   twitterRegex.test('@anantoghosh') // true
 */
export const twitterRegex = /\B@([\w_]+)/;

/**
 * Regex to match Jira ticket keys (e.g., ABC-123).
 * @type {RegExp}
 * @example
 *   jiraRegex.test('PROJ-42') // true
 */
export const jiraRegex = /[A-Z]+-\d+/i;

/**
 * Regex to match hashtags (e.g., #hashtag, #javascript).
 * Supports Unicode characters for international hashtags.
 * @type {RegExp}
 * @example
 *   hashtagRegex.test('#javascript') // true
 *   hashtagRegex.test('#café') // true
 *   hashtagRegex.test('#日本語') // true
 */
export const hashtagRegex = /\B#([\w\u00C0-\u017F\u0400-\u04FF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]+)/u;

/**
 * Regex to match mentions (e.g., @username, @user_name).
 * Supports Unicode characters for international usernames.
 * @type {RegExp}
 * @example
 *   mentionRegex.test('@username') // true
 *   mentionRegex.test('@user_name') // true
 *   mentionRegex.test('@utilisateur') // true
 */
export const mentionRegex = /\B@([\w\u00C0-\u017F\u0400-\u04FF\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]+)/u;
