import { NextPage } from "next";
import { ICategoryFormView } from "@/resources/interfaces/cctv/admin//categoryForm.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Box, Breadcrumbs, Button, Card, CardContent, Link, TextField } from "@mui/material";
import { RouteAdminCctvCategory } from "@/config/routing";
import { preventRedirect } from "@/core/helper/general";
import { CustomButton } from "@/components/custom/button.custom";
import { isView } from "@/config/view";

const CategoryFormView: NextPage<ICategoryFormView> = ({
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
      headerTitle="Form Kategori CCTV"
    >
      <MetaTag
        title="CCTV - Kategori Form"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={(e) => preventRedirect(e, router)} href={RouteAdminCctvCategory()}>List Kategori</Link>
        <Link underline="hover" color="inherit" href="#">Kategori Form</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <h1>Form Kategori CCTV</h1>
          <Box component="form" onSubmit={doSave} noValidate autoComplete="off" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: isMobile ? '100%' : '400px' }}>
            <TextField 
              disabled={state?.loading}
              id="filled-basic"
              label="Nama Kategori"
              variant="filled"
              value={state?.formInput?.name || ''}
              onChange={(e) => updateValue('name', e.target.value)}
              error={state?.formError?.name ? true : false}
              helperText={state?.formError?.name}
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
                onClick={() => router.push(RouteAdminCctvCategory())}
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

export default CategoryFormView;