import { useCallback, useState } from "react"

export function useCustomState<T>(data?: T) {
  const [state, updateState] = useState<T | undefined>(data);

  const setState = useCallback((dataState: Partial<T>) => {
    updateState((prevState) => {
      // Jika tidak ada state sebelumnya, return dataState langsung
      if (!prevState) {
        return { ...dataState } as T;
      }

      // Merge dengan spread operator yang lebih efisien
      return { ...prevState, ...dataState };
    });
  }, []);

  return {
    state,
    setState
  };
  // const [state, updateState] = useState<T>(data);

  // const setState = (dataState: T) => updateState((prevState) => {
  //   if (prevState) {
  //     let newState: T = state ?? prevState;

  //     for (let dt in prevState) {
  //       newState[dt] = prevState[dt];
  //     }
  //     for (let dt in dataState) {
  //       newState[dt] = dataState[dt];
  //     }
  //     return { ...newState };
  //   }

  //   return { ...dataState };
  // });


  // return {
  //   state,
  //   setState
  // };
}