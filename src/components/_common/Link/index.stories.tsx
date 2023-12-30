import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Link from '.';

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: '/example',
    children: 'Link',
  },
  render: ({ children }) => <Link href="/example">{children}</Link>,
};

export const Active: Story = {
  args: {
    activeClassName: 'active',
    href: '/example',
    children: 'Link',
  },
  render: ({ children }) => (
    <Link href="/example" className="active">
      {children}
    </Link>
  ),
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'Link',
  },
  render: ({ children }) => <Link href="https://example.com">{children}</Link>,
};

export const CustomClassName: Story = {
  args: {
    className: 'custom-link',
    href: '/example',
    children: 'Link',
  },
  render: ({ children }) => (
    <Link href="/example" className="custom-link">
      {children}
    </Link>
  ),
};

export const AdditionalProps: Story = {
  args: {
    href: '/example',
    rel: 'noopener noreferrer',
    target: '_blank',
    children: 'Link',
  },
  render: ({ children }) => (
    <Link href="/example" rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  ),
};

export const HrefObject: Story = {
  args: {
    href: {
      pathname: '/example',
      query: { id: 1 },
    },
    children: 'Link',
  },
  render: ({ children }) => (
    <Link href={{ pathname: '/example', query: { id: 1 } }}>{children}</Link>
  ),
};

export const NoLinkStyle: Story = {
  args: {
    href: '/example',
    noLinkStyle: true,
    children: 'Link',
  },
  render: ({ children }) => (
    <Link href="/example" noLinkStyle>
      {children}
    </Link>
  ),
};
