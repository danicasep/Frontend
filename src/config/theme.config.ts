const keyTheme = "theme-key";

export const defaultTheme: "light" | "dark" = "light";

export const getTheme = (): "dark" | "light" => {
  const mode = (typeof window !== 'undefined' ? localStorage.getItem(keyTheme) : null)

  return mode == null ? defaultTheme : (mode == "light" ? "light" : "dark");
};

export const setTheme = (mode: "dark" | "light") => localStorage?.setItem(keyTheme, mode);

export const setFont = () => {
  document.documentElement.style.fontFamily = 'Montserrat, sans-serif';
};