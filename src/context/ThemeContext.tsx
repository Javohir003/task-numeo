"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f5f5f5", paper: "#fff" },
                text: { primary: "#000" },
              }
            : {
                background: { default: "#0D1117", paper: "#161B22" },
                text: { primary: "#C9D1D9" },
              }),
        },
        typography: {
          fontFamily: "Space Mono, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* MUI uchun umumiy reset */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeContext must be used within a CustomThemeProvider");
  return context;
};
