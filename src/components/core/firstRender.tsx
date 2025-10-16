import { useCustomState } from "@/core/helper/state.helper"
import { Backdrop, Box, BoxProps, Button, CircularProgress, Paper, Slide, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export const FirstRender = (props: BoxProps) => {

  const { state, setState } = useCustomState<{
    loading?: boolean;
    isSuccess?: boolean;
  }>({
    loading: true,
    isSuccess: true,
  });

  const doGet = async () => {
    setState({ loading: true });
    
    // GET DATA

    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <>
    {state?.isSuccess == false ? <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: (theme) => theme.palette.background.default }}
        open={true}
      >
        <Stack alignItems={"center"}>
          {
            state?.loading ? <>
              <CircularProgress color="primary" sx={{ marginBottom: 3 }} />
              <Typography color={"blue"}>Sedang mendapatkan data ...</Typography>
            </> : <Button color="primary" onClick={doGet}>Retry</Button>
          }
        </Stack>
      </Backdrop>
    </> : <Slide direction="left" in={state?.isSuccess} timeout={500}>
      <Paper elevation={0} sx={{background: "transparent"}}>
        {props.children}
      </Paper>
    </Slide>}
  </>
}