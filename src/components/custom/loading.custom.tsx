import { Backdrop, CircularProgress } from "@mui/material";

export interface ICustomLoading {
  loading: boolean;
}

export const CustomLoading = (props: ICustomLoading) => {
  return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={props.loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
}