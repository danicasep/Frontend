import { NextPage } from "next";
import { ICctvFormView } from "@/resources/interfaces/cctv/admin//cctvForm.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Box, Breadcrumbs, Card, CardContent, FormControl, FormHelperText, InputLabel, Link, MenuItem, Select, TextField } from "@mui/material";
import { isView } from "@/config/view";
import { CustomButton } from "@/components/custom/button.custom";
import { RouteAdminCctv } from "@/config/routing";
import { preventRedirect } from "@/core/helper/general";

const CctvFormView: NextPage<ICctvFormView> = ({
  doSave, setState, state, refs, router
}) => {
  const isMobile = isView("mobile");

  const updateValue = (name: string, value: string) => {
    setState({
      formInput: { ...state.formInput, [name]: value },
      formError: { ...state.formError, [name]: null }
    })
  }
  return <>
    <ContainerAdmin
      headerTitle="Header CCTV"
    >
      <MetaTag
        title="CCTV - Cctv Form"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={(e) => preventRedirect(e, router)} href={RouteAdminCctv()}>Daftar CCTV</Link>
        <Link underline="hover" color="inherit" href="#">Form CCTV</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <h1>Form CCTV</h1>
          <Box component="form" onSubmit={doSave} noValidate autoComplete="off" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              disabled={state?.loading}
              id="filled-basic"
              label="Nama CCTV"
              variant="filled"
              value={state?.formInput?.name || ''}
              onChange={(e) => updateValue('name', e.target.value)}
              error={state?.formError?.name ? true : false}
              helperText={state?.formError?.name}
            />
            <TextField
              disabled={state?.loading}
              id="filled-basic"
              label="RTSP URL"
              variant="filled"
              value={state?.formInput?.rtspUrl || ''}
              onChange={(e) => updateValue('rtspUrl', e.target.value)}
              error={state?.formError?.rtspUrl ? true : false}
              helperText={state?.formError?.rtspUrl}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={state?.formError?.cctvCategoryId ? true : false}
                value={state?.formInput?.cctvCategoryId || ''}
                label="Kategori"
                onChange={(e) => {
                  updateValue('cctvCategoryId', e.target.value);
                }}
              >
                {state?.cctvCategories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormHelperText error={state?.formError?.cctvCategoryId ? true : false}>{state?.formError?.cctvCategoryId}</FormHelperText>
            <TextField
              disabled={state?.loading}
              id="filled-basic"
              label="Deskripsi"
              variant="filled"
              multiline={true}
              minRows={3}
              value={state?.formInput?.description || ''}
              onChange={(e) => updateValue('description', e.target.value)}
              error={state?.formError?.description ? true : false}
              helperText={state?.formError?.description}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CustomButton
                variant="contained"
                color="primary"
                type="submit"
                loading={state?.loading || false}
              >
                Simpan
              </CustomButton>
              <CustomButton
                variant="outlined"
                color="info"
                type="button"
                loading={state?.loading || false}
                onClick={() => router.push(RouteAdminCctv())}
              >
                Kembali
              </CustomButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvFormView;