import { Cctv } from "@/models/cctv";
import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICctvFormState {
  loading?: boolean;
  cctv?: Cctv;
  cctvCategories?: CctvCategory[];
  formInput?: any;
  formError?: any;
}

export interface ICctvFormView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICctvFormState | undefined; 
  setState: Dispatch<ICctvFormState>;
  doSave: (evt: FormEvent) => Promise<void>;
}