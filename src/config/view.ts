import { useMediaQuery } from "@mui/material"
import { ConfigGlobal } from "./config"

export const isView = (typeView: "mobile" | "tablet") => {
  const width = typeView == "mobile" ? ConfigGlobal.view.mobileView : ConfigGlobal.view.tabletView;
  return !useMediaQuery(`(min-width: ${width}px`);
}