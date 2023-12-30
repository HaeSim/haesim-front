// FIXME: Update this configuration file based on your project information

type AppConfigType = {
  site_name: string;
  title: string;
  description: string;
  imageUrl: string;
  locale: string;
  canonical: string;
  base_url: string;
};

export const AppConfig: AppConfigType = {
  site_name: 'haesim',
  title: 'haesim',
  description: "haesim's blog",
  imageUrl: '/images/og_haesim.png',
  locale: 'ko',
  canonical: 'https://haesim.me',
  base_url: '/api/v1',
};

export const makePageTitle = (title: string) => `${title} | ${AppConfig.title}`;

// 홈, 소개, 포스팅, 작품
type MenuConfigType = 'HOME' | 'ABOUT' | 'POSTS' | 'WORKS';

export type MenuItem = {
  label: string;
  value: string;
  path: string;
};

const createMenuItem = (
  label: string,
  value: string,
  path: string
): MenuItem => ({
  label,
  value,
  path,
});

export const PAGES: Record<MenuConfigType, MenuItem> = {
  HOME: createMenuItem('Home', 'home', '/'),
  ABOUT: createMenuItem('About', 'about', '/about'),
  POSTS: createMenuItem('Posts', 'posts', '/posts'),
  WORKS: createMenuItem('Works', 'works', '/works'),
};
