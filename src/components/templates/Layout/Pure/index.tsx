import React from 'react';

import type { ILayoutComponent } from '@/types/common/component';

const Pure: ILayoutComponent = ({ children }) => {
  return (
    <>
      {children}
      {/*  */}
    </>
  );
};

export default Pure;
