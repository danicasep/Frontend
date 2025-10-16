import { useEffect } from "react";

export const HeaderProgress = () => {
  
  useEffect(() => {
    console.log(document.readyState)
  }, [])
  return <>
  </>
}