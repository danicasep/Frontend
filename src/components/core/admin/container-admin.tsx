import { Box, BoxProps, Container, Theme, ThemedProps, useMediaQuery, useTheme } from "@mui/material"
import { HeaderAdmin } from "./header-admin"
import { NavbarAdmin } from "./navbar-admin"
import { useCustomState } from "@/core/helper/state.helper"
import { DarkTheme } from "@/components/custom/theme/dark.theme"
import { LightTheme } from "@/components/custom/theme/light.theme"
import { defaultTheme, getTheme, setTheme } from "@/config/theme.config"
import { ContainerTheme } from "../container.theme"
import { createContext, useContext, useEffect } from "react"
import { isView } from "@/config/view"

export interface IContainerAdmin extends BoxProps {
  headerTitle: string;
}

export const ContainerAdmin = (props: IContainerAdmin) => {
  const { state, setState } = useCustomState<{
    isShowingNavbar?: boolean
    themeMode?: string
    theme?: Theme
  }>({
    isShowingNavbar: false,
    themeMode: defaultTheme,
  });

  const isMobileView = isView("mobile");
  const drawerWidth = 320;

  useEffect(() => {
    setState({ theme: getTheme() == "light" ? LightTheme : DarkTheme })
  }, [state?.themeMode])

  useEffect(() => {
    setState({ isShowingNavbar: !isMobileView })
  }, [isMobileView])

  return <>
    <Box color={state?.theme?.palette?.text?.primary} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
      <ContainerTheme>
        <HeaderAdmin
          drawerWidth={drawerWidth}
          titleHeader={props.headerTitle}
          isMobileView={isMobileView}
          isShowingNavbar={state?.isShowingNavbar}
          onClickMenu={() => setState({ isShowingNavbar: !state?.isShowingNavbar })}
          themeOnChange={(mode) => {
            setTheme(mode);
            setState({ themeMode: mode })
          }}
        />
        <NavbarAdmin
          isShowingNavbar={state.isShowingNavbar}
          widthNavbar={drawerWidth}
          themeOnChange={(mode) => {
            setTheme(mode);
            setState({ themeMode: mode })
          }}
          onClose={() => {
            if (isMobileView) {
              setState({ isShowingNavbar: !state?.isShowingNavbar })
            }
          }}
        />
        <Box sx={{width: "100%", backgroundColor: state?.theme?.palette?.background?.default, fontFamily: 'Montserrat, sans-serif'}}>
          <Container maxWidth={false} sx={{ minHeight: "100vh", backgroundColor: state?.theme?.palette?.background?.default, marginLeft: isMobileView ? 0 : 1, fontFamily: 'Montserrat, sans-serif' }}>
            <Box paddingTop={14} sx={{ pl: isMobileView ? 0 : `${drawerWidth}px`, fontFamily: 'Montserrat, sans-serif' }}>
              {props.children}
            </Box>
          </Container>
        </Box>
      </ContainerTheme>
    </Box>
  </>
}