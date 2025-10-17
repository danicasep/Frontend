import { NextPage } from "next";
import { ILoginView } from "@/resources/interfaces/login.interface";
import { MetaTag } from "@/components/core/metatag";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { CustomButton } from "@/components/custom/button.custom";
import { isView } from "@/config/view";

const LoginView: NextPage<ILoginView> = ({
  doLogin, setState, state, refs, router
}) => {
  const isMobileView = isView("mobile");
  return (
    <>
      <MetaTag
        title="BPTD CCTV - Login"
      />
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: isMobileView ? 2 : 3,
          backgroundImage: 'url(/images/bg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            width: '100%',
            height: '10%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <img
            alt=""
            src="/images/logo.png"
            style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10, boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.27)' }}
          />
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'rgb(0, 119, 255)', fontFamily: 'Montserrat' }}>
              BPTD CCTV
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'rgb(255, 255, 255)', mt: -0.6, fontFamily: 'Montserrat' }}>
              Login Page
            </Typography>
          </Box>
        </Box>


        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', width: '100%' }}>
          <Box
            component="form"
            onSubmit={doLogin}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.6)',
              padding: 4,
              borderRadius: 5,
              width: isMobileView ? '100%' : 400,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: 'rgb(3, 154, 255)', fontFamily: 'Montserrat', textAlign: 'center' }}>Selamat Datang</Typography>
            <Typography sx={{ fontSize: 12, color: 'rgb(112, 112, 112)', mb: 3, fontFamily: 'Montserrat', textAlign: 'center' }}>Silahkan masukan username dan password yang sudah terdaftar</Typography>



            <TextField
              margin="normal"
              required
              size="small"
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              error={state?.formError?.username != null}
              disabled={state?.loading}
              helperText={state?.formError?.username}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              autoFocus
              onChange={(evt) => setState({ username: evt?.currentTarget?.value })}
              InputLabelProps={{ style: { color: 'rgb(112, 112, 112)', fontFamily: 'Montserrat', fontSize: 14 } }}
              InputProps={{ style: { color: 'rgb(112, 112, 112)', fontFamily: 'Montserrat', fontSize: 14 } }}
            />
            <TextField
              margin="normal"
              required
              size="small"
              name="password"
              label="Password"
              type="password"
              id="password"
              disabled={state?.loading}
              error={state?.formError?.password != null}
              helperText={state?.formError?.password}
              autoComplete="current-password"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              onChange={(evt) => setState({ password: evt?.currentTarget?.value })}
              InputLabelProps={{ style: { color: 'rgb(112, 112, 112)', fontFamily: 'Montserrat', fontSize: 14 } }}
              InputProps={{ style: { color: 'rgb(112, 112, 112)', fontFamily: 'Montserrat' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={state?.loading}
                  onChange={(evt) => setState({ isForever: evt.target.checked })}
                  value="remember"
                  color="primary"
                />
              }
              label={<Typography style={{ color: 'rgb(112, 112, 112)', fontFamily: 'Montserrat', fontSize: 14 }}>Remember me</Typography>}
            />
            <CustomButton
              type="submit"
              fullWidth
              disabled={state?.loading}
              loading={state?.loading}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg,rgb(0, 119, 255) 0%,rgb(0, 138, 131) 100%)',
                color: 'rgb(255, 255, 255)',
                paddingBlock: 2,
                mt: 3,
                borderRadius: 2,
                fontFamily: 'Montserrat',
              }}
            >
              Sign In
            </CustomButton>

          </Box>
        </Box>



      </Container>
    </>
  );
};

export default LoginView;
