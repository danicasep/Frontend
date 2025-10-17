import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvPageState } from "@/resources/interfaces/cctv/admin//cctvPage.interface";
import CctvPageView from "@/resources/views/cctv/admin//cctvPage.view";
import { deleteCctv } from "@/api/api.delete";
import { Auth } from "@/core/auth";
import { getAdminCctvs, restartAllCctvs } from "@/api/api.get";
import { putCctvStatus } from "@/api/api.put";

const CctvPagePage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvPageState>({
    loading: false,
    cctvs: [],
    openConfirmModal: false,
    selectedCctv: {},
    totalCctvs: 0,
    page: 1,
    perPage: 10
  });

  const { enqueueSnackbar } = useSnackbar();

  const credentialRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const auth = Auth().get();

  const router = useCustomRouter();

  const doSave = async (evt: FormEvent) => {
    // your action
    evt.preventDefault();
  }

  const doGet = async () => {
    setState({ loading: true });
    const response = await getAdminCctvs(auth?.token, { page: state.page, perPage: state.perPage });

    if (response.record) {
      setState({ cctvs: response.record.data, totalCctvs: response.record.total });
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }
    setState({ loading: false });
  }

  const doRestartCctvs = async () => {
    setState({ loading: true });

    const response = await restartAllCctvs(auth?.token);
    if (response.record) {
      enqueueSnackbar('Semua CCTV berhasil direstart.', { variant: 'success' });
      setState({ openConfirmRestartModal: false });
    }
    else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ loading: false });
  }

  const doUpdateStatus = async (id: any) => {
    setState({ loading: true });

    const response = await putCctvStatus(id, auth?.token);
    if (response.record) {
      enqueueSnackbar('Status CCTV berhasil diperbarui.', { variant: 'success' });
      setState({ openConfirmStatusModal: false, cctvs: state?.cctvs?.map(cctv => cctv.id === id ? response.record : cctv) });
    }
    else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ loading: false });
  }

  const doDelete = async (id: any) => {
    setState({ loading: true });

    const response = await deleteCctv(id, auth?.token);

    if (response.record) {
      setState({ openConfirmModal: false });
      enqueueSnackbar('CCTV berhasil dihapus.', { variant: 'success' });
      await doGet();
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CctvPageView
    router={router}
    doSave={doSave}
    doRestartCctvs={doRestartCctvs}
    doUpdateStatus={doUpdateStatus}
    doGet={doGet}
    doDelete={doDelete}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CctvPagePage;