import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvListState } from "@/resources/interfaces/cctv//cctvList.interface";
import CctvListView from "@/resources/views/cctv//cctvList.view";
import { getCctvs } from "@/api/api.get";

const CctvListPage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvListState>({
    loading: false,
    cctvs: []
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
    const categoryId = router.query.category_id?.toString() || "";

    const cctvs = await getCctvs(categoryId);
    if (cctvs.record) {
      setState({ cctvs: cctvs.record });
    } else {
      enqueueSnackbar(cctvs.error?.message || "Gagal mendapatkan data cctv", { variant: "error" });
    }
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CctvListView
    router={router}
    doSave={doSave}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CctvListPage;