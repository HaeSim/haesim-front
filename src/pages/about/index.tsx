import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const About: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title="About" description={AppConfig.description} />
      {/*  */}
    </>
  );
};

About.getLayout = generateGetLayout(Default);

export default About;
