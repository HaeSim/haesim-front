import type { Session } from 'next-auth';

const authenticatedCallback = (_session: Session) => {
  // eslint-disable-next-line no-console
};

const loadingCallback = () => {
  // console.log('loading');
};

const unauthenticatedCallback = () => {
  // console.log('unauthenticated');
};

export { authenticatedCallback, loadingCallback, unauthenticatedCallback };
