# react-linkify-it 🔗

[![Npm version](https://badgen.net/npm/v/react-linkify-it)](https://www.npmjs.com/package/react-linkify-it)
[![Build](https://github.com/anantoghosh/react-linkify-it/actions/workflows/node.js.yml/badge.svg)](https://github.com/anantoghosh/react-linkify-it/actions/workflows/node.js.yml)
[![Min zipped size](https://badgen.net/bundlephobia/minzip/react-linkify-it)](https://bundlephobia.com/package/react-linkify-it)
![Tree shaking supported](https://badgen.net/bundlephobia/tree-shaking/react-linkify-it)
[![Maintainability](https://api.codeclimate.com/v1/badges/fcb46fb37e7c25990c53/maintainability)](https://codeclimate.com/github/anantoghosh/react-linkify-it/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fcb46fb37e7c25990c53/test_coverage)](https://codeclimate.com/github/anantoghosh/react-linkify-it/test_coverage)

A tiny universal linking solution that turns **any pattern** in your text clickable (aka linkify).

`react-linkify-it` comes with a set of prebuilt components for specific linking needs and a generic component to wrap any pattern with a component.

Prebuilt components for linking:

- URLs
- Jira Tickets
- Twitter usernames
- Emails

You can also use the generic component which lets you support your own use case as desired:

- Link GitHub Issues
- Link tags to any social media
- Link email addresses
- Link phone numbers
- **Link any pattern you want!**
- **Wrap any pattern with a component!**

### Features

- 📦 **Tiny** - Less than 800 bytes gzipped after tree shaking.
- 🔹 **Dependency free** - No extra dependencies. Just a single file.
- 📝 **Customizable** - Adjust to your specific case as required.
- 💧 **Generic** - Not just links, wrap any pattern with _any_ component.
- 🏎 **Fast** - Single pass processing.
- 🦺 **Safe** - Sanitized urls to prevent any XSS attacks.
- 🌐 **i18n** - Works with urls that contain international characters.
- ⚔ **Tested** - Thoroughly.
- 🕸 **React support** - Works with react v16.2+

### Notes

- `react-linkify-it` provides a modern bundle for actively maintained browsers and a larger legacy bundle for older browsers.  
  [Read about how to utilize them](#using-modern-and-legacy-bundle).

## Demo
[Code Sandbox](https://codesandbox.io/s/react-linkify-it-c5n82g)

## Installation

```sh
npm i react-linkify-it
```

### Usage - Prebuilt Components

_Every prebuilt component also optionally accepts a `className` to attach to the link wrapper_

#### 1. Urls

```jsx
import { LinkItUrl } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItUrl>
      <p>"add some link https://www.google.com here"</p>
    </LinkItUrl>
  </div>
);

```

#### 2. Jira Tickets

```jsx
import { LinkItJira } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItJira domain="https://projectid.atlassian.net">
      hello AMM-123 ticket
    </LinkItJira>
  </div>
);
```

#### 3. Twitter handles

```jsx
import { LinkItTwitter } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItTwitter>
      hello @anantoghosh twitter
    </LinkItTwitter>
  </div>
);
```

#### 4. Emails
```jsx
import { LinkItEmail } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItEmail>
      hello example@gmail.com email
    </LinkItEmail>
  </div>
);
```

### Usage - Generic Component

```jsx
import { LinkIt } from 'react-linkify-it';

const regexToMatch = /@([\w_]+)/;

const App = () => (
  <div className="App">
    <LinkIt
      {/* Component to wrap each match with */}
      component={(match, key) => <a href={match} key={key}>{match}</a>}
      regex={regexToMatch}
    >
      www.google.com<div>hi @anantoghosh</div>
    </LinkIt>
  </div>
);

```

- **match** - regex match text
- **key** - unique key for the match

### Usage - Generic Function

```jsx
import { linkIt, UrlComponent } from 'react-linkify-it';

const regexToMatch = /@([\w_]+)/;

const App = () => {

  const output = linkIt(
    // Text to be linkified
    text,
    // Component to wrap each match with, can be any React component
    (match, key) => <UrlComponent match={match} key={key} />,
    regexToMatch
  );

  return <div className="App">{output}</div>
};

```

- **match** - regex match text
- **key** - unique key for the match

### Using multiple matches

Just use more than one component to match multiple patterns.
```jsx
import { LinkItEmail, LinkItUrl } from 'react-linkify-it';

const App = () => (
  <div className="App">
    <LinkItUrl>
      <LinkItEmail>
        hello example@gmail.com https://google.com
      </LinkItEmail>
    </LinkItUrl>
  </div>
);

```

## Using modern and legacy bundle

By default, when you import `react-linkify-it`, it will use a modern bundle
meant for browsers which
support [RegExp Unicode property escapes](https://caniuse.com/mdn-javascript_builtins_regexp_property_escapes).

If you are using `babel-preset-env`, or any bundler configuration which uses it (e.g. `create-react-app`, `vite`) with a
browser which does not support RegExp Unicode property escapes, babel will
transform the code to support the browsers resulting in a larger bundle.

If your setup does not use `babel-preset-env` and you would still like to support
older browsers, you can use the legacy bundle by importing:

### For javascript projects

```js
import { linkIt, LinkIt } from "react-linkify-it/legacy";
```

### For typescript projects ([why?](https://github.com/microsoft/TypeScript/issues/33079))

```js
import { linkIt, LinkIt } from "react-linkify-it/dist/react-linkify-it.legacy.esm.min";
```

_Note_: Legacy bundle has a larger file size (~3.4Kb minziped).

## Using a browser bundle

An umd build with legacy browser support can be used from [Unpkg](https://unpkg.com/react-linkify-it).

## Acknowledgment

This project was made possible due to the incredible work done on the following projects:

- [sanitize-url](https://github.com/braintree/sanitize-url)
- [react-linkify](https://github.com/tasti/react-linkify)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
