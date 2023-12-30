import { LinearProgress } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';

import Navbar from '@/components/_common/Navbar';
import type { ILayoutComponent } from '@/types/common/component';

const Default: ILayoutComponent = ({ children }) => {
  const [scrollProgress, setScrollProgress] = React.useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = scrollY / height;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* scroll 이 존재할 때만 progress bar를 보여준다. */}
      <LinearProgress
        variant="determinate"
        value={scrollProgress * 100}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          opacity: scrollProgress > 0 ? 1 : 0,
          transition: 'opacity 0.5s',
        }}
      />

      <Navbar />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          mt: 12,
          mb: 2,
          minHeight: 'calc(100vh - 64px - 64px)',
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Default;
