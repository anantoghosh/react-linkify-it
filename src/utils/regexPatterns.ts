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
  /([\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+(\.[\p{L}\p{N}!#$%&'*+/=?^_`{|}~-]+)*)@([\p{L}\p{N}-]+(\.[\p{L}\p{N}-]+)*\.[\p{L}]{2,})/u;

/**
 * Regex to match Twitter handles (e.g., @username).
 * @type {RegExp}
 * @example
 *   twitterRegex.test('@anantoghosh') // true
 */
export const twitterRegex = /\B@([\p{L}\p{N}_]+)/u;

/**
 * Regex to match hashtags (e.g., #hashtag, #javascript).
 * Supports Unicode characters for international hashtags.
 * @type {RegExp}
 * @example
 *   hashtagRegex.test('#javascript') // true
 *   hashtagRegex.test('#café') // true
 *   hashtagRegex.test('#日本語') // true
 */
export const hashtagRegex = /\B#([\p{L}\p{N}_]+)/u;

/**
 * Regex to match mentions (e.g., @username, @user_name).
 * Supports Unicode characters for international usernames.
 * @type {RegExp}
 * @example
 *   mentionRegex.test('@username') // true
 *   mentionRegex.test('@user_name') // true
 *   mentionRegex.test('@utilisateur') // true
 */
export const mentionRegex = /\B@([\p{L}\p{N}_]+)/u;
