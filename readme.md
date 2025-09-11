

# react-linkify-it 🔗

**A super tiny, dependency-free, highly customizable React utility to turn any pattern in your text into clickable links or custom components. Instantly linkify URLs, emails, Jira tickets, Twitter handles, hashtags, or anything else—out of the box or with your own rules.**

[![Npm version](https://badgen.net/npm/v/react-linkify-it)](https://www.npmjs.com/package/react-linkify-it)
[![Build](https://github.com/anantoghosh/react-linkify-it/actions/workflows/node.js.yml/badge.svg)](https://github.com/anantoghosh/react-linkify-it/actions/workflows/node.js.yml)
[![NPM bundle size](https://img.shields.io/bundlephobia/minzip/react-linkify-it)](https://bundlephobia.com/package/react-linkify-it)
![Tree shaking supported](https://img.shields.io/badge/Tree%20Shaking-Supported-blue)
[![Maintainability](https://api.codeclimate.com/v1/badges/fcb46fb37e7c25990c53/maintainability)](https://codeclimate.com/github/anantoghosh/react-linkify-it/maintainability)
[![codecov](https://codecov.io/github/anantoghosh/react-linkify-it/graph/badge.svg?token=1W6XJAO4JY)](https://codecov.io/github/anantoghosh/react-linkify-it)
[![Known Vulnerabilities](https://snyk.io/test/github/anantoghosh/react-linkify-it/badge.svg)](https://snyk.io/test/github/anantoghosh/react-linkify-it)

<a href="https://github.com/sponsors/anantoghosh" target="_blank"><img alt="Support me on Github" src="https://anantoghosh.github.io/assets/support_github.svg" style="height: 50px !important;width: auto !important;" /></a>
<a href="https://www.buymeacoffee.com/ananto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: auto !important;" ></a>

---



## Why You'll Love react-linkify-it ✨

- ⚡ **Super tiny**: Less than 800 bytes gzipped after tree shaking!
- 🪶 **Zero dependencies**: No bloat, No extra dependencies. Just a single file.
- 🛠️ **Ultra customizable**: Linkify any pattern, use your own regex, wrap with any component. Adjust to your specific case as required.
- 🔗 **Prebuilt for you**: URLs, emails, Jira tickets, Twitter handles—ready out of the box.
- 💧 **Generic**: Not just links, wrap any pattern with _any_ component.
- 🧩 **Composable**: Nest, combine, and mix patterns as you like.
- 🚀 **Blazing fast**: Single-pass processing.
- 🦺 **Safe**: Sanitizes URLs to prevent XSS.
- 🌍 **i18n & emoji friendly**: Works with URLs that contain international characters and emojis.
- 🧹 **Tree-shakable**: Only what you use gets bundled.
- 🧪 **Production ready**: Thoroughly tested and used in real apps.
- ⚛️ **React support**: Works with React v16.2+

Make your text interactive, your way. Fun, fast, and flexible! 🎉

---

## Demo

[Code Sandbox](https://codesandbox.io/s/react-linkify-it-c5n82g)

---

## Installation

```sh
npm i react-linkify-it
```

---

## Usage



### Usage - Prebuilt Components

These components make it super easy to linkify common patterns. All accept the following props:

- `children` (string | ReactNode, required): The content to scan and linkify.
- `className` (string, optional): CSS class for the anchor tag(s) created.

#### 1. `<LinkItUrl>`

**What it does:**
Scans its children for URLs (http, https, www) and wraps them in `<a href="...">` tags.

**Props:**
- `children` (required): Content to linkify.
- `className` (optional): CSS class for the anchor tag.

```jsx
import { LinkItUrl } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItUrl className="my-link">
      <p>add some link https://www.google.com here</p>
    </LinkItUrl>
  </div>
);
```

#### 2. `<LinkItJira>`

**What it does:**
Finds Jira ticket keys (e.g. `PROJ-123`) and links them to your Jira instance.

**Props:**
- `children` (required): Content to linkify.
- `domain` (required): Base URL of your Jira instance (e.g. `https://projectid.atlassian.net`).
- `className` (optional): CSS class for the anchor tag.

```jsx
import { LinkItJira } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItJira domain="https://projectid.atlassian.net" className="jira-link">
      hello AMM-123 ticket
    </LinkItJira>
  </div>
);
```

#### 3. `<LinkItTwitter>`

**What it does:**
Finds Twitter handles (e.g. `@username`) and links them to Twitter profiles.

**Props:**
- `children` (required): Content to linkify.
- `className` (optional): CSS class for the anchor tag.

```jsx
import { LinkItTwitter } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItTwitter className="twitter-link">
      hello @anantoghosh twitter
    </LinkItTwitter>
  </div>
);
```

#### 4. `<LinkItEmail>`

**What it does:**
Finds email addresses and wraps them in `mailto:` links.

**Props:**
- `children` (required): Content to linkify.
- `className` (optional): CSS class for the anchor tag.

```jsx
import { LinkItEmail } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItEmail className="email-link">
      hello example@gmail.com email
    </LinkItEmail>
  </div>
);
```



#### 5. `<LinkIt>` (Generic Component)

**What it does:**
Lets you linkify any pattern using your own regex and custom component. Perfect for advanced use cases or custom patterns.

**Props:**
- `component` (required): Function `(match, key) => ReactNode` to render each match.
- `regex` (required): RegExp to match your pattern.
- `children` (required): Content to linkify (string or ReactNode).

```jsx
import { LinkIt } from 'react-linkify-it';

// Example: Linkify all @usernames
const regexToMatch = /@([\w_]+)/g;

const App = () => (
  <div className="App">
    <LinkIt
      component={(match, key) => (
        <a href={`https://twitter.com/${match.slice(1)}`} key={key} style={{ color: 'purple' }}>
          {match}
        </a>
      )}
      regex={regexToMatch}
    >
      www.google.com<div>hi @anantoghosh</div>
    </LinkIt>
  </div>
);
```

#### Example: Custom Hashtag Linkifier for Your Social Media

You can easily linkify hashtags and point them to any social media you want (e.g. Instagram, Mastodon, TikTok, etc):

```jsx
import { LinkIt } from 'react-linkify-it';

// Regex to match hashtags (e.g. #OpenSource)
const hashtagRegex = /#(\w+)/g;

// Change the base URL to your favorite social media
const socialBase = 'https://www.instagram.com/explore/tags/';

const App = () => (
  <div className="App">
    <LinkIt
      component={(match, key) => (
        <a
          href={`${socialBase}${match.slice(1)}`}
          key={key}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#e1306c' }} // Instagram pink
        >
          {match}
        </a>
      )}
      regex={hashtagRegex}
    >
      Check out #OpenSource and #React!
    </LinkIt>
  </div>
);
```


### Usage - Generic Function

The `linkIt` function is a utility for linkifying any string using your own regex and component, outside of React tree rendering.

```jsx
import { linkIt, UrlComponent } from 'react-linkify-it';

const regexToMatch = /@([\w_]+)/g;

const App = () => {
  // 'linkIt' returns an array of React nodes or the original string
  const output = linkIt(
    text, // string to linkify
    (match, key) => <UrlComponent match={match} key={key} />, // your component
    regexToMatch // your regex
  );

  return <div className="App">{output}</div>;
};
// - 'text': string to process
// - 'component': (match, key) => ReactNode
// - 'regex': RegExp
```


### Using Multiple Matches

You can nest prebuilt components to linkify multiple patterns at once:

```jsx
import { LinkItEmail, LinkItUrl } from 'react-linkify-it';

const App = () => (
  <div className="App">
    {/* Linkify URLs and emails together */}
    <LinkItUrl>
      <LinkItEmail>
        hello example@gmail.com https://google.com
      </LinkItEmail>
    </LinkItUrl>
  </div>
);
```

---

## Customization

All prebuilt components accept the following props:

- `className` (string, optional): CSS class for the anchor tag.
- `children` (string | ReactNode): Content to linkify.

`LinkItJira` additionally requires:
- `domain` (string, required): Base URL of your Jira instance (e.g. `https://projectid.atlassian.net`).

The generic `LinkIt` component accepts:
- `component`: Function `(match, key) => ReactNode` to render each match.
- `regex`: RegExp to match your pattern.
- `children`: Content to linkify.

The `linkIt` function accepts:
- `text`: String to process.
- `component`: Function `(match, key) => ReactNode`.
- `regex`: RegExp.

You can also import and use the regex patterns directly:

```js
import { urlRegex, emailRegex, twitterRegex, jiraRegex } from 'react-linkify-it';
```

---

---

## Using Modern and Legacy Bundle

By default, when you import `react-linkify-it`, it will use a modern bundle which can be transpiled or minified as required.

If your setup does not use `babel-preset-env` and you would still like to support older browsers, you can use the legacy bundle by importing:

### For JavaScript and modern Typescript Projects

```js
import { linkIt, LinkIt } from "react-linkify-it/legacy";
```

### For TypeScript < v5.0.0 Projects ([why?](https://github.com/microsoft/TypeScript/issues/33079))

```js
import { linkIt, LinkIt } from "react-linkify-it/dist/react-linkify-it.legacy.esm.min";
```

_Note_: Legacy bundle has a slightly larger file size.

---

## Using a Browser Bundle

An UMD build with legacy browser support can be used from [Unpkg](https://unpkg.com/react-linkify-it).

---

## Acknowledgment

This project was made possible due to the incredible work done on the following projects:

- [sanitize-url](https://github.com/braintree/sanitize-url)
- [react-linkify](https://github.com/tasti/react-linkify)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

Hey 👋 If my packages have helped you in any way, consider making a small donation to encourage me to keep contributing. Maintaining good software takes time and effort, and for open-source developers, there are very few incentives to do so. Your contribution is greatly appreciated and will motivate me to continue supporting and developing my packages.

<a href="https://github.com/sponsors/anantoghosh" target="_blank"><img alt="Support me on Github" src="https://anantoghosh.github.io/assets/support_github.svg" style="height: 50px !important;width: auto !important;" /></a>
<a href="https://www.buymeacoffee.com/ananto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: auto !important;" ></a>
