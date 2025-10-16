import { getTheme } from "@/config/theme.config"
import { ThemeProvider } from "@emotion/react"
import { BoxProps } from "@mui/material"
import { DarkTheme } from "../custom/theme/dark.theme"
import { LightTheme } from "../custom/theme/light.theme"

export const ContainerTheme = (props: BoxProps) => {
  return <ThemeProvider theme={getTheme() == "dark" ? DarkTheme : LightTheme}>
    {props.children}
  </ThemeProvider>
}