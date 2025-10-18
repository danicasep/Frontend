import { Cctv } from "@/models/cctv";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICctvListState {
  loading?: boolean;
  cctvs?: Cctv[];
  unitId?: string;
}

export interface ICctvListView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICctvListState | undefined; 
  setState: Dispatch<ICctvListState>;
  doSave: (evt: FormEvent) => Promise<void>;
}