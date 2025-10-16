import { getTheme } from "@/config/theme.config";

export const CustomColor = {
  headerCard: getTheme() == "dark" ? "#212121": "#ecf0f1",
  primary: "#1976d2",
  info: "#0288d1",
  success: "#2e7d32"
}