import { SideBar } from "@/config/sidebar"
import { getTheme } from "@/config/theme.config"
import { isLinkActive, preventRedirect, useCustomRouter } from "@/core/helper/general"
import { useCustomState } from "@/core/helper/state.helper"
import { DarkMode, ExpandLess, ExpandMore, LightMode, StarBorder } from "@mui/icons-material"
import { Box, Collapse, Divider, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, createTheme, useTheme } from "@mui/material"
import { useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';

export const NavbarAdmin = (props: {
  isShowingNavbar: boolean,
  onClose: () => void,
  widthNavbar: number;
  themeOnChange: (mode: "dark" | "light") => void
}) => {

  const theme = useTheme();
  const router = useCustomRouter();

  const { state, setState } = useCustomState<{
    openChilds?: any
    isActive?: any
  }>({
    openChilds: {},
    isActive: {}
  });

  useEffect(() => {
    let tmpChilds = {}
    let tmpActive = {}
    SideBar().map((sidebar, index) => {
      if (sidebar?.child?.length > 0) {
        tmpChilds[index] = false;
      }

      tmpActive[index] = isLinkActive(router, sidebar?.link);
      sidebar?.child?.map((child, i) => {
        const isActive = isLinkActive(router, child?.link);
        tmpActive[`child-${index}-${i}`] = isActive;

        if (isActive) tmpChilds[index] = true;
      })
    })

    setState({
      isActive: tmpActive,
      openChilds: tmpChilds
    });
  }, [router])

  return <>
    <Drawer
      open={props.isShowingNavbar}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: props.isShowingNavbar ? props.widthNavbar : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: props.isShowingNavbar ? props.widthNavbar : 0,
          boxSizing: 'border-box',
          background: "linear-gradient(45deg, rgb(155, 89, 182), rgb(0, 132, 255), rgb(52, 73, 94))",
          backdropFilter: "blur(20px)",
          margin:2,
          borderRadius:4,
          height: "96vh"
        },
        transition: ".2s"
      }}
      variant={"permanent"}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    // onClose={props.onClose}
    >
      {/* Header */}
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} paddingInline={2} paddingBlock={2.5} mb={2} sx={{backgroundColor: "rgba(255, 255, 255, .9)"}}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
          <img alt="" src="/base_icon.png" style={{ height: 35 }} />
        </Box>

        <IconButton onClick={() => {
          props.themeOnChange(getTheme() == "dark" ? "light" : "dark")
        }}>
          {theme?.palette?.mode == "dark" ? <LightMode sx={{ fontSize: 20, color:'white', }} /> : <DarkMode sx={{ fontSize: 20, color: 'yellow' }} />}
        </IconButton>
      </Box>
      <List style={{ marginLeft: 20, flex: 1, overflow: "auto" }}>
        {SideBar().map((sideBar, index) => {
          if (sideBar == null) return <Divider />
          return <>
            <ListItem key={`${sideBar?.label}-drawer`} disablePadding>
              <ListItemButton sx={{ mb: 2.5 }} component={sideBar?.child.length == 0 ? "a" : null} selected={state?.isActive?.[index]} href={sideBar?.link} onClick={(evt) => {
                if (sideBar?.child?.length > 0) {
                  setState({
                    openChilds: { ...state?.openChilds, [index]: !state?.openChilds?.[index] }
                  });
                } else {
                  props.onClose();

                  if (sideBar?.isNewTab == true) {
                    evt.preventDefault();
                    window.open(sideBar?.link, "_blank");
                  }
                  else preventRedirect(evt, router)
                }
              }}>
                <ListItemIcon sx={{ mr: -2 }}>
                  {sideBar?.icon ? <sideBar.icon sx={{ color: 'rgb(255, 255, 255)' }} /> : null}
                </ListItemIcon>
                <ListItemText primary={sideBar?.label} sx={{ color: '#fff', fontFamily: 'Montserrat' }} />
                {
                  sideBar?.child?.length > 0 ?
                    state?.openChilds?.[index] ? <ExpandLess sx={{ color: theme.palette.primary.main }} /> : <ExpandMore sx={{ color: theme.palette.primary.main }} />
                    : null
                }
              </ListItemButton>
            </ListItem>

            {
              sideBar?.child?.length > 0 ? <>
                <Collapse in={state?.openChilds?.[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {sideBar?.child?.map((child, i) => {
                      return <>
                        <ListItemButton component="a" href={child?.link} selected={state?.isActive?.[`child-${index}-${i}`]} sx={{ pl: 5, mb: 1.5 }} onClick={(evt) => {
                          preventRedirect(evt, router);
                          props.onClose();
                        }}>
                          <ListItemIcon sx={{ color: theme.palette.primary.main, mr: -2 }}>
                            {child?.icon ? <child.icon  sx={{ color: 'rgb(255, 255, 255)' }}/> : null}
                          </ListItemIcon>
                          <ListItemText primary={child?.label} sx={{ color: 'white', fontFamily: 'Montserrat' }} />
                        </ListItemButton>
                      </>
                    })}
                  </List>
                </Collapse>
              </> : null
            }
          </>
        })}
      </List>

    </Drawer>
  </>
}