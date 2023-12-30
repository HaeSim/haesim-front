import type { ReactNode } from 'react';

import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

type ITemplateProps = {
  children?: ReactNode;
};

const Template: NextPageWithLayout<ITemplateProps> = (
  _props: ITemplateProps
) => {
  return (
    <>
      <MetaInfo title="-" description="-" />
      {/*  */}
    </>
  );
};

Template.getLayout = generateGetLayout(Default);

export { Template };
