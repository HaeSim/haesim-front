import React from 'react';

import type { ILayoutComponent } from '@/types/common/component';

const Default: ILayoutComponent = ({ children }) => {
  return (
    <>
      {children}
      {/*  */}
    </>
  );
};

export default Default;
