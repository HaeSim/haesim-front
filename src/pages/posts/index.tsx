import { Box, Paper, Typography } from '@mui/material';

import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import postsData from '@/data/posts.json';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

type Post = {
  datetime: string;
  title: string;
  content: string;
};

/**
 * @description Posts page
 * blog post 목록을 보여주는 페이지
 */
const Posts: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title="Posts" description={AppConfig.description} />
      <Box display="flex" flexDirection="column" gap={3}>
        {postsData.map((post: Post, index: number) => (
          <Paper
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            sx={{
              padding: 2,
              ':hover': {
                boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.datetime}
            </Typography>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </Paper>
        ))}
      </Box>
    </>
  );
};

Posts.getLayout = generateGetLayout(Default);

export default Posts;
