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
