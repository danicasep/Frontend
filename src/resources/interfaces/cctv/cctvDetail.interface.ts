import { Cctv } from "@/models/cctv";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICctvDetailState {
  loading?: boolean;
  cctv?: Cctv;
  srcRtsp?: string;
  unitId?: string;
  previousId?: string;
  nextId?: string;
}

export interface ICctvDetailView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICctvDetailState | undefined; 
  setState: Dispatch<ICctvDetailState>;
  doSave: (evt: FormEvent) => Promise<void>;
}