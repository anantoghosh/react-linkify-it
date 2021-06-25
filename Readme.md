# react-link-text 🔗

A small react package that turns urls in your text clickable (aka linkify).  
Unlike other linkify libraries,'react-link-text' utilizes a straightforward method for detecting links that begin with http, https, or www (customizable).  
This works well for most cases.

### Features

- 📦 **Tiny** - Less than 500 bytes gzipped.
- 📝 **Customizable** - Adjust to your specific case as required.
- 🏎 **Fast** - Single pass processing.
- 🦺 **Safe** - Sanitized urls to prevent any XSS attacks.
- 🌐 **i18n** - Works with urls that contain international characters.
- 🕸 **React support** - Works with react v16.2+

### Notes

- `react-link-text` is only meant to make website urls in a text clickable. Though you can pass it any regex to match your requirements.
- By default, only links starting with `http`, `https`, and `www` are detected.

## Installation

```sh
npm i react-link-text
```

### Usage

```jsx
import addLinks form 'react-link-text';

const App = () => (
  <div className="App">
    <p>addLinks("add some link https://www.google.com here")</p>

    // Options describes in the next section
    <p>addLinks("www.google.com", options)</p>
  </div>
);

```

### Options

```js
interface Options {
  component?: (url: string, key: string, className?: string) => JSX.Element;
  className?: string;
  regex?: RegExp;
}

addLinks(text, options);
```

## Acknowledgment

This project was made possible due to the incredible work done on the following projects:

- [sanitize-url](https://github.com/braintree/sanitize-url)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
