import { NextPage } from "next";
import { ICctvDetailView } from "@/resources/interfaces/cctv//cctvDetail.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Box, Breadcrumbs, Button, Card, CardContent, Link } from "@mui/material";
import HlsPlayer from "@/components/custom/hls-player.custom";
import { RouteCctvCategories, RouteCctvDetail, RouteCctvList } from "@/config/routing";
import CustomLoading from "@/components/custom/loading.custom";
import { preventRedirect } from "@/core/helper/general";

const CctvDetailView: NextPage<ICctvDetailView> = ({
  doSave, setState, state, refs, router
}) => {
  return <>
    <ContainerAdmin
      headerTitle="CCTV - Detail"
    >
      <MetaTag
        title="CCTV - Cctv Detail"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={(e) => preventRedirect(e, router)} href={RouteCctvCategories(state?.unitId)}>CCTV Kategori</Link>
        <Link underline="hover" color="inherit" onClick={(e) => preventRedirect(e, router)} href={RouteCctvList(state?.cctv?.cctvCategoryId?.toString())}>{state?.cctv?.category?.name}</Link>
        <Link underline="hover" color="inherit" onClick={(e) => preventRedirect(e, router)} href={"#"}>{state?.cctv?.name}</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CustomLoading isLoading={state?.loading} variant="dots"/>
        <CardContent>
          <h1>Live Camera - {state?.cctv?.category?.service_unit?.name}</h1>
          {state?.srcRtsp ? (
            <Box sx={{ width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <HlsPlayer src={state?.srcRtsp} autoPlay muted />
            </Box>
          ) : (
            <p>No live stream available</p>
          )}
          <Box sx={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginTop: 2, marginBottom: 2}}>
            <Button onClick={() => window.location.href = RouteCctvDetail(state?.previousId.toString(), state?.cctv?.category?.id?.toString())} disabled={!state?.previousId} variant="outlined">Previous</Button>
            <Button onClick={() => window.location.href = RouteCctvDetail(state?.nextId?.toString(), state?.cctv?.category?.id?.toString())} disabled={!state?.nextId} variant="outlined">Next</Button>
          </Box>
          <hr style={{marginTop: 10, marginBottom: 10}}/>
          <h3>{state?.cctv?.name}</h3>
          <pre>{state?.cctv?.description}</pre>
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvDetailView;