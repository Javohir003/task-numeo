"use client";

import { Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useRef } from "react";
import { useGithub } from "../context/GithubContext";
import { useThemeContext } from "../context/ThemeContext";

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const { fetchGithubUser, error, setError } = useGithub();
  const { mode } = useThemeContext();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 🔹 Debounce orqali fetch qilish
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setError(null);

    // Avvalgi timeoutni bekor qilish
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Yangi timeout qo‘yish — 500 ms kutish
    debounceRef.current = setTimeout(() => {
      if (value.trim() === "") {
        fetchGithubUser(""); // agar input bo‘sh bo‘lsa — tozalash
      } else {
        fetchGithubUser(value.trim());
      }
    }, 500);
  };

  // 🔹 Enter yoki Search bosilganda darhol qidirish
  const handleSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (username.trim()) fetchGithubUser(username.trim());
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "30px",
        justifyContent: "space-between",
        height: "60px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          py: "5px",
          boxShadow: "0px 0px 3px #80808065",
          px: "10px",
          borderRadius: "8px",
          alignItems: "center",
          backgroundColor: mode === "light" ? "#f6f8ff" : "#1E2A47",
          gap: "8px",
        }}
      >
        <SearchIcon sx={{ color: "#0079FF" }} />
        <input
          type="text"
          placeholder="Search"
          style={{
            outline: "none",
            width: "100%",
            padding: "10px 5px",
            backgroundColor: "transparent",
            border: "0",
            color: mode === "light" ? "#4b6a9b" : "white",
          }}
          value={username}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <Typography
          variant="inherit"
          sx={{
            fontSize: { xs: "12px", sm: "15px" },
            position: "absolute",
            right: { xs: "50px", sm: "80px" },
            transform: "translateX(-50%)",
          }}
        >
          {error ? <span style={{ color: "red" }}>{error}</span> : ""}
        </Typography>

        <Button
          sx={{
            px: { xs: "20px", sm: "35px" },
            py: { xs: "5px", sm: "10px" },
            backgroundColor: "#0079FF",
            "&:hover": { backgroundColor: "#3399FF" },
            textTransform: "none",
            borderRadius: "8px",
            fontSize: { xs: "12px", sm: "15px" },
            color: mode === "light" ? "white" : "#f0f0f0",
          }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
