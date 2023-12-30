import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import MetaInfo from '@/components/_common/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { AppConfig, PAGES } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

/**
 * @description Posts page
 * blog post 목록을 보여주는 페이지
 */
const Works: NextPageWithLayout = () => {
  return (
    <>
      <MetaInfo title={PAGES.WORKS.label} description={AppConfig.description} />
      {/* url : https://app.songbirdquiz.com/
        image : https://app.songbirdquiz.com/og_songbird.png */}
      {/* 내가 만든 사이트를 카드형태로 보여줌, 클릭하면 해당 사이트로 새창으로 이동 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardActionArea
              href="https://app.songbirdquiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image="https://app.songbirdquiz.com/images/og_songbird.png"
                alt="Songbird Quiz"
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  2023. 12.
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Songbird Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A quiz game that your youtube playlist
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardActionArea
              href="https://app.songbirdquiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image="https://app.songbirdquiz.com/images/og_songbird.png"
                alt="Songbird Quiz"
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  2023. 12.
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Songbird Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A quiz game that your youtube playlist
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardActionArea
              href="https://app.songbirdquiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image="https://app.songbirdquiz.com/images/og_songbird.png"
                alt="Songbird Quiz"
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  2023. 12.
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Songbird Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A quiz game that your youtube playlist
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardActionArea
              href="https://app.songbirdquiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image="https://app.songbirdquiz.com/images/og_songbird.png"
                alt="Songbird Quiz"
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  2023. 12.
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Songbird Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A quiz game that your youtube playlist
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardActionArea
              href="https://app.songbirdquiz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                component="img"
                height="140"
                image="https://app.songbirdquiz.com/images/og_songbird.png"
                alt="Songbird Quiz"
              />
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  2023. 12.
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Songbird Quiz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A quiz game that your youtube playlist
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

Works.getLayout = generateGetLayout(Default);

export default Works;
