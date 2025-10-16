import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";

export interface ICustomButton extends ButtonProps {
  loading?: boolean;
}

export const CustomButton = (props: ICustomButton) => {
  
  const buttonProps = {...props};
  if(props.endIcon) buttonProps.endIcon = props?.loading ? null : props.endIcon;
  if(props.startIcon) buttonProps.startIcon = props?.loading ? null : props.startIcon;
  
  return <Button 
  {...buttonProps }>
    {props.loading ? <>
      <Box sx={{color: "white", marginRight: 2}}>
        <CircularProgress color={props.variant == "contained" || typeof props.variant === 'undefined' ? "inherit" : props.color} size={20} sx={{marginRight: 2}}/>
      </Box>
    </> : null}
    {props.children}
  </Button>
}