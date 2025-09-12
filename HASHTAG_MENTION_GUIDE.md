# LinkItHashtag and LinkItMention Components

## LinkItHashtag

The `LinkItHashtag` component automatically converts hashtags in text to clickable links using a customizable URL template.

### Basic Usage

```jsx
import { LinkItHashtag } from 'react-linkify-it';

// Link to Twitter hashtags
<LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
  Check out #javascript and #react for web development!
</LinkItHashtag>

// Link to Instagram hashtags
<LinkItHashtag urlTemplate="https://instagram.com/explore/tags/{hashtag}">
  Love this #sunset #photography 📸
</LinkItHashtag>

// Link to custom platform
<LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
  Discussing #AI and #MachineLearning trends
</LinkItHashtag>
```

### With Custom Styling

```jsx
<LinkItHashtag 
  urlTemplate="https://twitter.com/hashtag/{hashtag}"
  className="hashtag-link"
>
  Join the #OpenSource community! #coding #developers
</LinkItHashtag>
```

### Unicode Support

```jsx
<LinkItHashtag urlTemplate="https://example.com/tags/{hashtag}">
  Love #café and #日本語 hashtags!
</LinkItHashtag>
```

## LinkItMention

The `LinkItMention` component automatically converts mentions (@username) in text to clickable links using a customizable URL template.

### Basic Usage

```jsx
import { LinkItMention } from 'react-linkify-it';

// Link to Twitter profiles
<LinkItMention urlTemplate="https://twitter.com/{mention}">
  Thanks to @reactjs and @typescript for amazing tools!
</LinkItMention>

// Link to GitHub profiles
<LinkItMention urlTemplate="https://github.com/{mention}">
  Shoutout to @octocat and @defunkt for GitHub!
</LinkItMention>

// Link to custom user profiles
<LinkItMention urlTemplate="https://example.com/users/{mention}">
  Welcome @newuser and @johndoe to our platform!
</LinkItMention>
```

### With Custom Styling

```jsx
<LinkItMention 
  urlTemplate="https://twitter.com/{mention}"
  className="mention-link"
>
  Great work @developer1 and @designer2 on this project!
</LinkItMention>
```

### Discord-style Mentions

```jsx
<LinkItMention urlTemplate="https://discord.com/users/{mention}">
  @everyone check out what @moderator shared!
</LinkItMention>
```

### Unicode Support

```jsx
<LinkItMention urlTemplate="https://example.com/users/{mention}">
  Welcome @utilisateur and @ユーザー to our platform!
</LinkItMention>
```

## Combining Components

You can easily combine multiple LinkIt components:

```jsx
<LinkItHashtag urlTemplate="https://twitter.com/hashtag/{hashtag}">
  <LinkItMention urlTemplate="https://twitter.com/{mention}">
    Thanks @reactjs for #react! Check out #javascript too.
  </LinkItMention>
</LinkItHashtag>
```

## URL Template Placeholders

- **HashItHashtag**: Use `{hashtag}` placeholder (without the # symbol)
- **LinkItMention**: Use `{mention}` placeholder (without the @ symbol)

The components automatically URL-encode the hashtag/mention values for safe URL construction.

## Features

- ✅ Unicode character support
- ✅ Automatic URL encoding
- ✅ Customizable URL templates
- ✅ TypeScript support
- ✅ Custom CSS classes
- ✅ Comprehensive test coverage
- ✅ Zero dependencies (except React)
