import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Close, DarkMode, LightMode, Logout } from '@mui/icons-material';
import { colors, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Stack, styled, useTheme } from '@mui/material';
import { useCustomState } from '@/core/helper/state.helper';
import { NotificationAdmin } from './notification-admin';
import { HeaderProgress } from '../header-progress';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Auth } from '@/core/auth';
import { preventRedirect, setLink, useCustomRouter } from '@/core/helper/general';
import { isView } from '@/config/view';
import { getTheme } from '@/config/theme.config';

export const HeaderAdmin = (props: {
  onClickMenu: () => void,
  titleHeader: string;
  isMobileView: boolean;
  drawerWidth: number;
  isShowingNavbar: boolean;
  themeOnChange: (mode: "dark" | "light") => void
}) => {

  const { state, setState } = useCustomState<{
    menuAccount?: boolean,
    menuAccountAnchor?: any,
    loading?: boolean,
  }>({
    menuAccount: false
  });

  const theme = useTheme();

  const auth = Auth().get();
  const isMobileView = isView("mobile");

  const router = useCustomRouter();

  const doLogout = async () => {
    setState({ loading: true });

    Auth().logout();

    router.push("/");

    setState({ loading: false });
  }

  const menuAccount = () => {
    return <Menu
      aria-labelledby="demo-positioned-button"
      anchorEl={state?.menuAccountAnchor}
      open={state?.menuAccount}
      onClose={() => {
        setState({ menuAccount: false })
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Stack 
        alignItems="center" 
        flexDirection="row" 
        sx={{ 
          paddingX: 2 
        }}>
        <SentimentSatisfiedAltIcon color="warning" />
        <Box sx={{ marginLeft: 2 }}>
          <Typography 
            variant="caption" 
            fontFamily="Montserrat">
            Selamat Datang,
          </Typography>
          <Typography variant="body2" fontFamily="Montserrat">{auth?.data?.name}</Typography>
        </Box>
      </Stack>
      <Divider sx={{ marginY: 1 }} />
      <MenuItem onClick={() => router.push(setLink("/account", { view: "profile" }))} >Profile</MenuItem>
      {auth?.data?.level == "superadmin" ? <>
        <MenuItem component="a" href="/account/setting" onClick={(evt) => {
          setState({ menuAccount: false })
          preventRedirect(evt, router);
        }} >Pengaturan</MenuItem>
      </> : null}
      <Divider />
      <MenuItem onClick={doLogout} >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText >Logout</ListItemText>
      </MenuItem>
    </Menu>
  }

  // const AppBarCustom = styled<AppBarProps>();

  return <>
    <Box sx={{ flexGrow: 1, backgroundColor:'transparent' }} >
      <HeaderProgress />
      <AppBar position="fixed"
        sx={{
          boxShadow: 4,
          backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
          margin: 2,
          marginLeft: isMobileView ? 2 : 4,
          borderRadius: 4,
          left: props.isShowingNavbar ? `${props.drawerWidth}px` : "0px",
          transition: ".2s",
          right: props.isShowingNavbar && isMobileView ? `-${props.drawerWidth}px` : "0px",
          width: "auto",
          height: 70,
          justifyContent: 'center'
        }}>
        <Toolbar variant="dense">
          {props.isMobileView ? <>
            <IconButton 
              edge="start" 
              aria-label="menu" 
              sx={{ mr: 2 }}
              onClick={props.onClickMenu}>
              {props.isShowingNavbar ? <Close /> : <MenuIcon />}
            </IconButton>
          </> : null}
          {/* <Typography variant="h6" color="inherit" component="div" fontFamily="Montserrat">
            {props?.titleHeader}
          </Typography> */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              sx={{ 
                fontSize: isMobileView ? 16 : 20, 
                fontWeight: 'bold', 
                fontFamily: 'Montserrat' 
                }} 
              color={theme.palette.mode === 'dark' ? 'white' : 'rgb(0, 53, 97)'} 
              component="div">
              {props?.titleHeader}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box 
              display={'flex'} 
              flexDirection={'column'} 
              alignItems={'flex-end'} 
              justifyContent={'center'}>
              <Typography 
                display={isMobileView ? 'none' : 'block'} 
                style={{ fontSize: 14, fontWeight: 'bold', marginBottom: -2, fontFamily: 'Montserrat' }} 
                color={theme.palette.mode === 'dark' ? 'white' : 'rgb(0, 53, 97)'}>
                {auth?.data?.name}
              </Typography>
              <Typography 
                display={isMobileView ? 'none' : 'block'} 
                style={{ fontSize: 12, color: '#999999', fontFamily: 'Montserrat' }}>
                {auth?.data?.level}
              </Typography>
            </Box>
            <IconButton onClick={(evt) => {
              setState({
                menuAccount: true,
                menuAccountAnchor: evt.currentTarget
              });
            }}>
              <img 
                src={auth?.data?.photo} 
                alt="" 
                style={{ height: 40, borderRadius: 5, marginLeft: 5 }} />
              
            </IconButton>
            {/* <NotificationAdmin /> */}
          </Box>
          {menuAccount()}
        </Toolbar>
      </AppBar>
    </Box>
  </>
}
