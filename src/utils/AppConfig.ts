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
  description: 'haesim 사이트',
  imageUrl: '/images/og_haesim.png',
  locale: 'ko',
  canonical: 'https://haesim.me',
  base_url: '/api/v1',
};

export const makePageTitle = (title: string) => `${title} | ${AppConfig.title}`;
