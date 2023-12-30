import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig, PAGES } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title={PAGES.HOME.label} description={AppConfig.description} />
      {/*  */}
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
