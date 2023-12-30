import { render, screen } from '@testing-library/react';
import React from 'react';

import Link from '.';

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/example',
  }),
}));

describe('Link', () => {
  test('renders link with href', () => {
    render(<Link href="/example">Example Link</Link>);
    const linkElement = screen.getByText('Example Link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/example');
  });

  test('applies active class when pathname matches', () => {
    render(
      <Link href="/example" activeClassName="active">
        Example Link
      </Link>
    );

    const linkElement = screen.getByText('Example Link');
    expect(linkElement).toHaveClass('active');
  });

  test('renders external link', () => {
    render(
      <Link href="https://example.com" noLinkStyle>
        External Link
      </Link>
    );

    const linkElement = screen.getByText('External Link');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
  });

  test('renders link with custom className', () => {
    render(
      <Link href="/example" className="custom-link">
        Custom Link
      </Link>
    );

    const linkElement = screen.getByText('Custom Link');
    expect(linkElement).toHaveClass('custom-link');
  });

  test('renders link with additional props', () => {
    render(
      <Link href="/example" target="_blank" rel="noopener noreferrer">
        Additional Props Link
      </Link>
    );

    const linkElement = screen.getByText('Additional Props Link');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders link with href as object', () => {
    const hrefObject = {
      pathname: '/example',
      query: { id: 1 },
    };

    render(<Link href={hrefObject}>Object Link</Link>);

    const linkElement = screen.getByText('Object Link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', '/example?id=1');
  });

  test('renders link with noLinkStyle', () => {
    render(
      <Link href="/example" noLinkStyle>
        No Link Style Link
      </Link>
    );

    const linkElement = screen.getByText('No Link Style Link');
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).not.toHaveClass('MuiLink-root');
  });
});
