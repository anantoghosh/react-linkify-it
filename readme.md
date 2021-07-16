# react-linkit 🔗 (Under development)

[![Npm version](https://badgen.net/npm/v/react-linkit)](https://www.npmjs.com/package/react-linkit)
[![Node.js CI](https://github.com/anantoghosh/react-linkit/actions/workflows/node.js.yml/badge.svg)](https://github.com/anantoghosh/react-linkit/actions/workflows/node.js.yml)
[![Min zipped size](https://badgen.net/bundlephobia/minzip/react-linkit)](https://bundlephobia.com/package/react-linkit)

A small react package that turns urls in your text clickable (aka linkify).  
Unlike other linkify libraries,'react-linkit' utilizes a straightforward method for detecting links that begin with http, https, or www (customizable).  
This works well for most cases.

### Features

- 📦 **Tiny** - Less than 800 bytes gzipped.
- 📝 **Customizable** - Adjust to your specific case as required.
- 🏎 **Fast** - Single pass processing.
- 🦺 **Safe** - Sanitized urls to prevent any XSS attacks.
- 🌐 **i18n** - Works with urls that contain international characters.
- ⚔ **Tested** - Thoroughly.
- 🕸 **React support** - Works with react v16.2+

### Notes

- `react-linkit` is only meant to make website urls in a text clickable. Though you can pass it any regex to match your requirements.
- By default, only links starting with `http`, `https`, and `www` are detected.
- `react-linkit` provides a modern bundle for actively maintained browsers and a larger legacy bundle for older browsers.  
  [Read about how to utilize them](#using-modern-and-legacy-bundle).

## Installation

```sh
npm i react-linkit
```

### Usage

#### 1. Using `linkIt` function

```jsx
import { linkIt } form 'react-linkit';

const App = () => (
  <div className="App">
    <p>linkIt("add some link https://www.google.com here", options)</p>
  </div>
);

```

#### 2. Using `LinkIt` component

```jsx
import { LinkIt } form 'react-linkit';

const App = () => (
  <div className="App">
    <LinkIt options={options}>
      <p>"add some link https://www.google.com here"</p>
    </LinkIt>
  </div>
);

```

### Options

```js
interface Options {
  // Component to wrap links with (forwarding the key to your component is required)
  component?: (
    url: string,
    text: string,
    key: string,
    className?: string
  ) => JSX.Element;

  // Attach className with the default `a` tag around links
  className?: string;

  // Link Matching regex
  regex?: RegExp;
}
```

### Examples

#### Attach a class to the generated links

```jsx
const options = {
  className: "this-class-should-be-in-the-link",
};

<LinkIt options={options}></LinkIt>;
linkIt(text, options);
```

#### Modify the link component

```jsx
const options = {
  component: (url, text, key) => (
    <a key={key} href={url}>
      This is a link: {text}
    </a>
  ),
};

<LinkIt options={options}></LinkIt>;
linkIt(text, options);
```

## Using modern and legacy bundle

By default, when you import `react-linkit`, it will use a modern bundle
meant for browsers which
support [RegExp Unicode property escapes](https://caniuse.com/mdn-javascript_builtins_regexp_property_escapes).

If you are using `babel-preset-env`, or any bundler configuration which uses it (e.g. `create-react-app`, `vite`) with a
browser which does not support RegExp Unicode property escapes, babel will
transform the code to support the browsers resulting in a larger bundle.

If your setup does not use `babel-preset-env` and you would still like to support
older browsers, you can use the legacy bundle by importing:

### For javascript projects

```js
import { linkIt, LinkIt } from "react-linkit/legacy";
```

### For typescript projects ([why?](https://github.com/microsoft/TypeScript/issues/33079))
```js
import { linkIt, LinkIt } from "react-linkit/dist/react-linkit.legacy.esm.min";
```
*Note*: Legacy bundle has a larger file size (~3.4Kb minziped).

## Using a browser bundle

An umd build with legacy browser support can be used from [Unpkg](https://unpkg.com/react-linkit).

## Acknowledgment

This project was made possible due to the incredible work done on the following projects:

- [sanitize-url](https://github.com/braintree/sanitize-url)
- [react-linkify](https://github.com/tasti/react-linkify)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
