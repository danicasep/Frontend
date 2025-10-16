import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LightTheme } from '@/components/custom/theme/light.theme';
import { DarkTheme } from '@/components/custom/theme/dark.theme';
import { getTheme } from '@/config/theme.config';
import { SnackbarProvider } from 'notistack';
import { FirstRender } from '@/components/core/firstRender';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ Component, pageProps }: AppProps) {

  return <ThemeProvider theme={getTheme() == "dark" ? DarkTheme : LightTheme}>
    <CssBaseline />

    <SnackbarProvider maxSnack={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FirstRender>
          <Component {...pageProps} />
        </FirstRender>
      </LocalizationProvider>
    </SnackbarProvider>
  </ThemeProvider>
}
