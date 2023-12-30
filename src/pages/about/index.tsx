import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig, PAGES } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const About: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title={PAGES.ABOUT.label} description={AppConfig.description} />
      {/*  */}
    </>
  );
};

About.getLayout = generateGetLayout(Default);

export default About;
