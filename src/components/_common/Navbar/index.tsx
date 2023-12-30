import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import Link from '@/components/_common/Link';
import Logo from '@/components/_common/Logo';
import { PAGES } from '@/utils/AppConfig';

import NavLogin from '../LoginButton';

/**
 * @description blog navigation bar
 * @include
 * - logo(image, /images/haesim_logo.png (500x500 px))(left)
 * - navigation links(centered)
 * - login button(right)
 */
const Navbar: FC = () => {
  // scroll event를 감지하여, navbar의 보이는 상태를 조절한다.
  const [showNav, setShowNav] = useState<boolean>(true);

  // scroll event를 감지하여, navbar의 보이는 상태를 조절한다.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos < 100;

      setShowNav(visible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <AppBar
      position="fixed"
      style={{
        top: showNav ? 4 : -64,
        transition: 'top 0.5s',
      }}
      color="transparent"
      sx={{
        boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.1)',
        // glass morphism
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* logo */}
        <Box minWidth={100} display="flex" justifyContent="center">
          <Link href="/" noLinkStyle>
            <Logo />
          </Link>
        </Box>
        {/* navigation links */}
        <Box display="flex" justifyContent="center" gap={4}>
          {Object.entries(PAGES).map(([key, value]) => (
            <Box key={key} sx={{ mx: 1 }}>
              <Link href={value.path} noLinkStyle>
                {value.label}
              </Link>
            </Box>
          ))}
        </Box>
        {/* login button */}
        <Box minWidth={100} display="flex" justifyContent="center">
          <NavLogin />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
