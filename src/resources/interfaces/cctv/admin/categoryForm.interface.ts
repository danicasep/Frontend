import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICategoryFormState {
  loading?: boolean;
  category?: CctvCategory;
  formInput?: any;
  formError?: any;
}

export interface ICategoryFormView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICategoryFormState | undefined; 
  setState: Dispatch<ICategoryFormState>;
  doSave: (evt: FormEvent) => Promise<void>;
}