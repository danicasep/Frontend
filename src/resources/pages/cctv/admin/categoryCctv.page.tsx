import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICategoryCctvState } from "@/resources/interfaces/cctv/admin//categoryCctv.interface";
import CategoryCctvView from "@/resources/views/cctv/admin//categoryCctv.view";
import { getAdminCategories } from "@/api/api.get";
import { Auth } from "@/core/auth";
import { deleteCctvCategory } from "@/api/api.delete";

const CategoryCctvPage: NextPage = () => {

  const { state, setState } = useCustomState<ICategoryCctvState>({
    loading: false,
    categories: [],
    selectedCategory: {},
    openConfirmModal: false,
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

  const doDelete = async (id: any) => {
    setState({ loading: true });

    const response = await deleteCctvCategory(id, auth?.token);

    if (response.record) {
      setState({ openConfirmModal: false });
      enqueueSnackbar('Kategori CCTV berhasil dihapus.', { variant: 'success' });
      await doGet();
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      }
    }

    setState({ loading: false });
  }

  const doGet = async () => {
    setState({ loading: true });

    const response = await getAdminCategories(auth?.token);

    if (response.record) {
      setState({ categories: response.record })
    } else {
      enqueueSnackbar(response.error?.message || "Gagal mendapatkan data Kategori CCTV", { variant: "error" });
    }

    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CategoryCctvView
    router={router}
    doSave={doSave}
    doDelete={doDelete}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CategoryCctvPage;