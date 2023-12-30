import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

/**
 * @description Posts page
 * blog post 목록을 보여주는 페이지
 */
const Posts: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title="Posts" description={AppConfig.description} />
      {/*  */}
    </>
  );
};

Posts.getLayout = generateGetLayout(Default);

export default Posts;
