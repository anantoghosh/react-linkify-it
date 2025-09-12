import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkIt } from '../../components/LinkIt';
import { UrlComponent } from '../../components/UrlComponent';
import { urlRegex } from '../../utils/regexPatterns';

test('LinkIt component with basic functionality', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      Visit https://example.com for more info
    </LinkIt>,
  );

  const link = screen.getByRole('link', { name: 'https://example.com' });
  expect(link).toHaveAttribute('href', 'https://example.com');
  // Text is split, so just check parts exist
  expect(screen.getByText(/Visit/)).toBeInTheDocument();
  expect(screen.getByText(/for more info/)).toBeInTheDocument();
});

test('LinkIt component with no matches', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      This text has no URLs
    </LinkIt>,
  );

  expect(screen.getByText('This text has no URLs')).toBeInTheDocument();
  expect(screen.queryByRole('link')).toBeNull();
});

test('LinkIt component with multiple matches', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      Visit https://example.com and also check www.github.com
    </LinkIt>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute('href', 'https://example.com');
  expect(links[1]).toHaveAttribute('href', 'http://www.github.com');
});

test('LinkIt component with mixed content including React elements', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    >
      Check out https://example.com
      <div>and this nested content</div>
      also www.test.com
    </LinkIt>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(2);
  expect(screen.getByText('and this nested content')).toBeInTheDocument();
});

test('LinkIt component with custom component', () => {
  const CustomComponent = ({ match }: { match: string }) => (
    <span data-testid="custom-link" data-url={match}>
      {match}
    </span>
  );

  render(
    <LinkIt
      component={(match, key) => <CustomComponent match={match} key={key} />}
      regex={urlRegex}
    >
      Visit https://example.com
    </LinkIt>,
  );

  const customElement = screen.getByTestId('custom-link');
  expect(customElement).toHaveAttribute('data-url', 'https://example.com');
  expect(customElement).toHaveTextContent('https://example.com');
});

test('LinkIt component with empty children', () => {
  render(
    <LinkIt
      component={(match, key) => <UrlComponent match={match} key={key} />}
      regex={urlRegex}
    ></LinkIt>,
  );

  expect(screen.queryByRole('link')).toBeNull();
});
