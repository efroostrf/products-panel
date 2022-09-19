import { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import Categories from 'components/Categories';
import Products from 'components/Products';
import GeneralModals from 'components/GeneralModals';
import styles from 'styles/index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

declare module '@mui/system' {
  interface BreakpointOverrides {
    laptop: true;
    mobile: true;
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

const Index: NextPage = () => {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 960,
            mobile: 0
          },
        },
      })}
    >
      <Head>
        <title>Products Panel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      </Head>
      <GeneralModals/>
      <ToastContainer/>
      <Grid container className={styles.container}>
        <Grid laptop={"auto"} mobile={true} item={true} position="relative" height="100%">
          <Categories/>
        </Grid>
        <Grid laptop={true} mobile={true} item={true}>
          <Products/>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Index;
