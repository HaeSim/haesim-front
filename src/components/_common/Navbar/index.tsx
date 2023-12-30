import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

import Link from '@/components/_common/Link';
import Logo from '@/components/_common/Logo';

import NavLogin from '../LoginButton';

/**
 * @description blog navigation bar
 * @include
 * - logo(image, /images/haesim_logo.png (500x500 px))(left)
 * - navigation links(centered)
 * - login button(right)
 */
const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.1)',
        // glassmorphism
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
          <Box sx={{ mx: 1 }}>
            <Link href="/" noLinkStyle>
              Home
            </Link>
          </Box>
          <Box sx={{ mx: 1 }}>
            <Link href="/about" noLinkStyle>
              About
            </Link>
          </Box>
          <Box sx={{ mx: 1 }}>
            <Link href="/posts" noLinkStyle>
              Posts
            </Link>
          </Box>
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
