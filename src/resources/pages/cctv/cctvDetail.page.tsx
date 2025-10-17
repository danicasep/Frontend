import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvDetailState } from "@/resources/interfaces/cctv//cctvDetail.interface";
import CctvDetailView from "@/resources/views/cctv//cctvDetail.view";
import { MIDDLEWARE_CONFIG } from "@/config/config";
import { getCctv } from "@/api/api.get";

const CctvDetailPage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvDetailState>({
    loading: false,
    cctv: {},
    srcRtsp: null
  });

  const { enqueueSnackbar } = useSnackbar();

  const credentialRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useCustomRouter();

  const doSave = async (evt: FormEvent) => {
    // your action
    evt.preventDefault();
  }

  const doGet = async () => {
    const { id } = router.query;
    if (!id) return;
    // your action
    // example for rtsp to hls
    //
    setState({ srcRtsp: `${MIDDLEWARE_CONFIG().CCTV_URI}/hls/cam_${id}/index.m3u8` });
    setState({ loading: true });
    const cctvs = await getCctv(id);
    if (cctvs.record) {
      setState({ cctv: cctvs.record });
    } else {
      enqueueSnackbar(cctvs.error?.message || "Gagal mendapatkan data cctv", { variant: "error" });
    }

    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CctvDetailView
    router={router}
    doSave={doSave}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CctvDetailPage;