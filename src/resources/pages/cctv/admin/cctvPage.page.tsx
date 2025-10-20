import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvPageState } from "@/resources/interfaces/cctv/admin//cctvPage.interface";
import CctvPageView from "@/resources/views/cctv/admin//cctvPage.view";
import { deleteCctv } from "@/api/api.delete";
import { Auth } from "@/core/auth";
import { getAdminCategories, getAdminCctvs, restartAllCctvs } from "@/api/api.get";
import { putCctvStatus } from "@/api/api.put";

const CctvPagePage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvPageState>({
    loading: false,
    cctvs: [],
    openConfirmModal: false,
    selectedCctv: {},
    totalCctvs: 0,
    page: 1,
    perPage: 10,
    categories: [],
    search: '',
    selectedCategoryFilter: '',
    isPaginate: false
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

  const doGet = async (evt?: FormEvent) => {
    evt?.preventDefault();
    setState({ loading: true });
    if(evt) setState({ page: 1 });
    const response = await getAdminCctvs(auth?.token, { page: evt ? 1 : state.page, perPage: state.perPage, search: state.search, cctvCategoryId: state.selectedCategoryFilter });

    if (response.record) {
      setState({ cctvs: response.record.data, totalCctvs: response.record.total });
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }
    setState({ loading: false, isPaginate: false });
  }

  const doRestartCctvs = async () => {
    setState({ loading: true });

    const response = await restartAllCctvs(auth?.token);
    if (response.record) {
      enqueueSnackbar('Semua CCTV berhasil direstart.', { variant: 'success' });
      setState({});
    }
    else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ openConfirmRestartModal: false, loading: false });
  }

  const doUpdateStatus = async (id: any) => {
    setState({ loading: true });

    const response = await putCctvStatus(id, auth?.token);
    if (response.record) {
      enqueueSnackbar('Status CCTV berhasil diperbarui.', { variant: 'success' });
      setState({ cctvs: state?.cctvs?.map(cctv => cctv.id === id ? response.record : cctv) });
    }
    else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ openConfirmStatusModal: false, loading: false });
  }

  const doDelete = async (id: any) => {
    setState({ loading: true });

    const response = await deleteCctv(id, auth?.token);

    if (response.record) {
      enqueueSnackbar('CCTV berhasil dihapus.', { variant: 'success' });
      await doGet();
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ openConfirmModal: false, loading: false });
  }

  const doOtherGet = async () => {
    setState({ loading: true });
    const response = await getAdminCategories(auth?.token);
    if (response.record) {
      setState({ categories: response.record });
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }
    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
    doOtherGet();
  }, []);

  useEffect(() => {
    if (state?.isPaginate == true) doGet();
  }, [state?.isPaginate == true]);

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