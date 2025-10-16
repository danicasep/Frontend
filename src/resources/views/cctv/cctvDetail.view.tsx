import { NextPage } from "next";
import { ICctvDetailView } from "@/resources/interfaces/cctv//cctvDetail.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Box, Breadcrumbs, Card, CardContent, Link } from "@mui/material";
import HlsPlayer from "@/components/custom/hls-player.custom";

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
        <Link underline="hover" color="inherit" href="/">CctvDetail</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <h1>Live Camera </h1>
          {state?.srcRtsp ? (
            <Box sx={{ width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
              <HlsPlayer src={state?.srcRtsp} autoPlay muted />
            </Box>
          ) : (
            <p>No live stream available</p>
          )}
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvDetailView;