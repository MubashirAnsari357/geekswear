import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import PropTypes from "prop-types";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../../src/createEmotionCache";
import AllOrders from "../../src/components/dashboard/AllOrders";
const clientSideEmotionCache = createEmotionCache();

export default function Index(props) {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
        footer {
          display: none;
        }
        navbar {
          display: none;
        }
      `}</style>
        <CssBaseline />
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <SalesOverview />
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={4}>
              <DailyActivity />
            </Grid>
            <Grid item xs={12} lg={8}>
              <AllOrders />
            </Grid>
            <Grid item xs={12} lg={12}>
              <BlogCard />
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

Index.propTypes = {
  emotionCache: PropTypes.object
};
