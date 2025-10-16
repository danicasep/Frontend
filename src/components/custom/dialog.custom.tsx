import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "notistack";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IDialogCustom extends DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onClose?: () => void;
}

export const DialogCustom = (params: IDialogCustom) => {
  const {open, onClose, children, actions, title} = params;
  return <>
    <Dialog
      {...params}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  </>
}