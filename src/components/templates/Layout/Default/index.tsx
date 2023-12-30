import Container from '@mui/material/Container';
import React from 'react';

import Navbar from '@/components/_common/Navbar';
import type { ILayoutComponent } from '@/types/common/component';

const Default: ILayoutComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          mt: 2,
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
