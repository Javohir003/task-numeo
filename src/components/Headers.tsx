"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

export default function Headers() {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        paddingY: { xs: "10px", sm: "30px" },
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Typography
          variant="h4"
          component="div"
          color={mode === "light" ? "#222731" : "white"}
          sx={{ fontSize: { xs: 20, sm: 25, md: 32 }, fontWeight: 700 }}
        >
          GitHub Finder
        </Typography>

        {/* Dark Mode Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "3px", sm: "8px" },
            cursor: "pointer",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={700}
            fontSize={20}
            color={mode === "light" ? "#222731" : "#c9d1d9"}
            sx={{ fontSize: { xs: "12px", sm: "16px" } }}
          >
            {mode === "light" ? "Dark" : "Light"}
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkModeIcon sx={{color: "#222731"}} /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}
