import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("threatdash-theme");
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("threatdash-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Theme color mappings
export const themeColors = {
  light: {
    // Backgrounds
    bg: "#FFFFFF",
    bgSecondary: "#F7F9FB",
    bgTertiary: "#ECF0F5",
    bgSidebar: "#001837",
    bgSidebarHover: "rgba(255,255,255,0.08)",
    bgSidebarActive: "rgba(27,126,255,0.15)",
    
    // Brand colors
    bgBrand: "#1B7EFF",
    bgBrandHover: "#1565D8",
    textBrand: "#1B7EFF",
    textOnBrand: "#FFFFFF",
    
    // Semantic colors
    bgDanger: "#FFEFF2",
    textDanger: "#D62828",
    bgInfo: "#D4E7FF",
    textInfo: "#1B7EFF",
    
    // Neutral colors
    border: "#EDECF9",
    borderBrand: "#1B7EFF",
    text: "#001837",
    textSecondary: "#474E62",
    textMuted: "#8F97AC",
    textSidebar: "#A1B2BF",
    textSidebarActive: "#FFFFFF",
    textDisabled: "#A1B2BF",
    
    // Additional
    shadowCard: "0 6px 16px rgba(19, 37, 72, 0.14)",
    shadowMenu: "0 6px 16px rgba(19, 37, 72, 0.14)",
  },
  dark: {
    // Backgrounds
    bg: "#0A1929",
    bgSecondary: "#132F4C",
    bgTertiary: "#1A3A52",
    bgSidebar: "#001E3C",
    bgSidebarHover: "rgba(255,255,255,0.08)",
    bgSidebarActive: "rgba(27,126,255,0.15)",
    
    // Brand colors
    bgBrand: "#1B7EFF",
    bgBrandHover: "#1565D8",
    textBrand: "#3399FF",
    textOnBrand: "#FFFFFF",
    
    // Semantic colors
    bgDanger: "#2D1319",
    textDanger: "#FF6B6B",
    bgInfo: "#0D2847",
    textInfo: "#3399FF",
    
    // Neutral colors
    border: "#1E3A52",
    borderBrand: "#1B7EFF",
    text: "#E3F2FD",
    textSecondary: "#B2BAC2",
    textMuted: "#6F7E8C",
    textSidebar: "#94A3B8",
    textSidebarActive: "#FFFFFF",
    textDisabled: "#6F7E8C",
    
    // Additional
    shadowCard: "0 6px 16px rgba(0, 0, 0, 0.4)",
    shadowMenu: "0 6px 16px rgba(0, 0, 0, 0.4)",
  },
};
