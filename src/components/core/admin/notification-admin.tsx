import { useCustomState } from "@/core/helper/state.helper";
import { styled } from '@mui/material/styles';
import { CircleNotifications, Drafts, Email, Notifications } from "@mui/icons-material";
import { Badge, BadgeProps, Box, CircularProgress, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Auth } from "@/core/auth";
import { enqueueSnackbar } from "notistack";
import { preventRedirect, useCustomRouter } from "@/core/helper/general";

export interface INotificationAdmin {
  id?: string;
  data?: {
    title?: string;
    message?: string;
    route?: string;
  }
  image?: string;
  created_at?: string;
  updated_at?: string;
  read_at?: string;
}

export const NotificationAdmin = (props: {
  notificationList?: INotificationAdmin[]
}) => {
  const { state, setState } = useCustomState<{
    isShowing?: boolean,
    loading?: boolean,
    notificationAnchor?: any,
    notificationList?: INotificationAdmin[]
    notificationUnread?: number;
  }>({
    isShowing: false,
    loading: false,
    notificationAnchor: null,
    notificationUnread: 0,
    notificationList: props?.notificationList ?? []
  });

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const auth = Auth().get();

  const router = useCustomRouter();

  const renderNotifications = () => {


    return <Menu
      slotProps={{
        paper: {
          sx: {
            width: "400px"
          }
        }
      }}
      aria-labelledby="demo-positioned-button"
      anchorEl={state?.notificationAnchor}
      open={state?.isShowing}
      onClose={() => {
        setState({ isShowing: false })
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Box>
          <Typography>Notifikasi</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {state?.notificationList?.map(notif => {
          return <>
            <ListItemButton selected={notif?.read_at == null} component={"a"} href={notif?.data?.route ?? "#"} onClick={async (evt) => {
              
                evt.preventDefault();
                
              }}>
              <Stack direction="row" alignItems={"start"} justifyContent={"start"}>
                <Badge color="error" variant="dot" invisible={notif?.read_at != null}>
                  {notif?.read_at == null ? <Email color="primary"/> : <Drafts/>}
                </Badge>
                <Box sx={{marginLeft: 2 }}>
                  <Typography fontWeight={"bold"} color={(theme) => notif?.read_at == null ? theme.palette.primary.main : null}>{notif?.data?.title}</Typography>
                  <Typography variant="body2">{notif?.data?.message}</Typography>
                </Box>
              </Stack>
            </ListItemButton>
            <Divider />
          </>
        })}
      </List>
      <MenuItem component="a" href="/account/notification" onClick={(evt) => preventRedirect(evt, router)}>
        <ListItemIcon>
          <CircleNotifications fontSize="small" />
        </ListItemIcon>
        <ListItemText>Tampilkan Semua</ListItemText>
      </MenuItem>
    </Menu>
  }

  const doGet = async () => {
    setState({ loading: true });

    // const response = await getNotifications(auth?.token, {});

    // if (response.data) {
    //   setState({
    //     notificationList: response.data?.data,
    //     notificationUnread: response.data?.unreads
    //   });
    // } else {
    //   enqueueSnackbar({
    //     message: response?.error?.message,
    //     variant: "error"
    //   })
    // }

    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <>
    <IconButton onClick={(evt) => {
      setState({
        isShowing: true,
        notificationAnchor: evt.currentTarget
      });
    }} style={{  }}>
      <StyledBadge badgeContent={state?.notificationUnread} color="secondary">
        {state?.loading ? <CircularProgress size={18} color="primary" /> : <Notifications sx={{ color: "#FFF" }} />}
      </StyledBadge>
    </IconButton>
    {renderNotifications()}
  </>
}