import { Cctv } from "@/models/cctv";
import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICctvPageState {
  loading?: boolean;
  cctvs?: Cctv[];
  openConfirmModal?: boolean;
  openConfirmStatusModal?: boolean;
  openConfirmRestartModal?: boolean;
  selectedCctv?: Cctv;
  totalCctvs?: number;
  page?: number;
  perPage?: number;
  categories?: CctvCategory[];
  search?: string;
  selectedCategoryFilter?: string;
  isPaginate?: boolean;
}

export interface ICctvPageView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICctvPageState | undefined; 
  setState: Dispatch<ICctvPageState>;
  doSave: (evt: FormEvent) => Promise<void>;
  doUpdateStatus: (id: any) => Promise<void>;
  doRestartCctvs: () => Promise<void>;
  doGet: (evt?: FormEvent) => Promise<void>;
  doDelete: (id: any) => Promise<void>;
}