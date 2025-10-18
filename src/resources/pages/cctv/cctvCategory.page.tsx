import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvCategoryState } from "@/resources/interfaces/cctv//cctvCategory.interface";
import CctvCategoryView from "@/resources/views/cctv//cctvCategory.view";
import { getCategories } from "@/api/api.get";

const CctvCategoryPage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvCategoryState>({
    loading: false,
    categories: []
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
    const unitId = router.query?.unit_id as string;
    if (!unitId) return;

    setState({ loading: true });
    const response = await getCategories(unitId);
    if (response.record) {
      setState({ categories: response.record });
    } else {
      enqueueSnackbar(response.error?.message || "Gagal mendapatkan data kategori CCTV", { variant: "error" });
    }
    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, [router?.query?.unit_id ?? null]);

  return <CctvCategoryView
    router={router}
    doSave={doSave}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CctvCategoryPage;