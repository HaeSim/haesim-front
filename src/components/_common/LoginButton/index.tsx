import LoadingButton from '@mui/lab/LoadingButton';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import SignInModal from '@/components/modal/SignInModal';
import useClientStore from '@/store/client';

const NavLogin: React.FC = () => {
  const { status: sessionStatus } = useSession();
  const { openComponentModal } = useClientStore((state) => state);

  const handleLoginClick = () => {
    if (sessionStatus === 'authenticated') return;

    openComponentModal(<SignInModal />);
  };

  const handleLogoutClick = () => {
    if (sessionStatus === 'unauthenticated') return;

    signOut();
  };

  if (!sessionStatus) return null;

  return (
    <LoadingButton
      loading={sessionStatus === 'loading'}
      onClick={
        sessionStatus === 'authenticated' ? handleLogoutClick : handleLoginClick
      }
    >
      {sessionStatus === 'authenticated' && 'Logout'}
      {sessionStatus === 'unauthenticated' && 'Login'}
    </LoadingButton>
  );
};

export default NavLogin;
