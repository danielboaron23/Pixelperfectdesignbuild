import { useTheme, themeColors } from "../context/ThemeContext";

export function useThemeColors() {
  const { theme } = useTheme();
  return themeColors[theme];
}
