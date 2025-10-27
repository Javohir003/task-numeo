"use client";

import { Box, Button, ButtonGroup, Container, Skeleton } from "@mui/material";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/User-card";
import Repositories from "../components/Repo-user";
import Headers from "../components/Headers";
import { useState } from "react";
import { useGithub } from "../context/GithubContext";
import Image from "next/image";

import Shape1 from "../../public/shape.png";
import Shape2 from "../../public/shape2.png";
import { useThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { userData, repos, loading } = useGithub();
  const [activeTab, setActiveTab] = useState<"about" | "repos">("about");
  const { mode } = useThemeContext();

  return (
    <main>
      <Image className="shape1" src={Shape1} alt="Shape" />
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 999,
          maxWidth: "1000px",
          margin: "0 auto",
          paddingY: 4,
        }}
      >
        <Headers />
        <SearchBar />

        {/* --- Toggle Buttons or Skeleton --- */}
        <Box display="flex" justifyContent="center" gap={2} mt={3} mb={4}>
          {loading ? (
            // Skeleton placeholders for toggles
            <>
              <Skeleton
                variant="rectangular"
                width={140}
                height={40}
                sx={{ borderRadius: "12px" }}
              />
              <Skeleton
                variant="rectangular"
                width={140}
                height={40}
                sx={{ borderRadius: "12px" }}
              />
            </>
          ) : (
            userData && (
              <ButtonGroup
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow:
                    mode === "light"
                      ? "0 2px 6px rgba(0,0,0,0.1)"
                      : "0 2px 8px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                }}
              >
                <Button
                  onClick={() => setActiveTab("about")}
                  sx={{
                    textTransform: "none",
                    width: { xs: "120px", sm: "140px" },
                    bgcolor:
                      activeTab === "about"
                        ? "#0079FF"
                        : mode === "light"
                        ? "#FFFFFF"
                        : "#1E2A47",
                    color:
                      activeTab === "about"
                        ? "#FFFFFF"
                        : mode === "light"
                        ? "#222731"
                        : "#A9B8D3",
                    "&:hover": {
                      bgcolor:
                        activeTab === "about"
                          ? "#005FCC"
                          : mode === "light"
                          ? "#F5F5F5"
                          : "#2A3A5C",
                    },
                    borderRight:
                      mode === "light"
                        ? "1px solid #E3E3E3"
                        : "1px solid #2E3A5C",
                  }}
                >
                  About
                </Button>

                <Button
                  onClick={() => setActiveTab("repos")}
                  sx={{
                    textTransform: "none",
                    width: { xs: "120px", sm: "140px" },
                    bgcolor:
                      activeTab === "repos"
                        ? "#0079FF"
                        : mode === "light"
                        ? "#FFFFFF"
                        : "#1E2A47",
                    color:
                      activeTab === "repos"
                        ? "#FFFFFF"
                        : mode === "light"
                        ? "#222731"
                        : "#A9B8D3",
                    "&:hover": {
                      bgcolor:
                        activeTab === "repos"
                          ? "#005FCC"
                          : mode === "light"
                          ? "#F5F5F5"
                          : "#2A3A5C",
                    },
                  }}
                >
                  Repositories
                </Button>
              </ButtonGroup>
            )
          )}
        </Box>
        {userData && (
          <>
            {activeTab === "about" ? (
              <UserCard user={userData} loading={loading} />
            ) : (
              <Repositories />
            )}
          </>
        )}
      </Container>
      <Image className="shape2" src={Shape2} alt="Shape" />
    </main>
  );
}
