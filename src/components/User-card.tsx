"use client";

import React from "react";
import {
  Card,
  Typography,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import BusinessIcon from "@mui/icons-material/Business";
import Link from "next/link";
import { GithubUser } from "../types/type";
import { useThemeContext } from "../context/ThemeContext";

interface UserCardProps {
  user?: GithubUser | null;
  loading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode } = useThemeContext();

  // 💡 Ranglar mode ga qarab belgilanadi
  const bgColor = mode === "light" ? "#fefefe" : "#1E2A47";
  const textPrimary = mode === "light" ? "#222731" : "#FFFFFF";
  const textSecondary = mode === "light" ? "#4B6A9B" : "#A9B8D3";
  const cardShadow =
    mode === "light" ? "0px 2px 12px rgba(0,0,0,0.1)" : "0px 2px 12px rgba(0,0,0,0.3)";
  const statsBg = mode === "light" ? "#F6F8FF" : "#141D2F";

  return (
    <Card
      sx={{
        maxWidth: "100%",
        mx: "auto",
        mt: 4,
        p: { xs: 2, sm: 4 },
        boxShadow: cardShadow,
        borderRadius: 4,
        backgroundColor: bgColor,
        color: textPrimary,
        transition: "all 0.3s ease",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "1fr" : "120px 1fr"}
        gap={isMobile ? 3 : 4}
        alignItems="flex-start"
      >
        {/* Avatar */}
        {loading ? (
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ bgcolor: mode === "light" ? "#E3E3E3" : "#2E3A5C" }}
          />
        ) : (
          <Avatar
            src={user?.avatar_url}
            alt={user?.name}
            sx={{
              width: 120,
              height: 120,
              border: "2px solid #fff",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              justifySelf: isMobile ? "center" : "start",
            }}
          />
        )}

        {/* Right side */}
        <Box display="grid" gap={isMobile ? 1 : 2}>
          {/* Header info */}
          <Box>
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems={isMobile ? "flex-start" : "center"}
            >
              <Typography variant="h6" fontWeight={700} sx={{ color: textPrimary }}>
                {loading ? <Skeleton width={120} /> : user?.name || "No Name"}
              </Typography>

              <Typography
                sx={{
                  color: textSecondary,
                  fontSize: 14,
                  mt: { xs: 1, sm: 0 },
                }}
              >
                {loading ? (
                  <Skeleton width={80} />
                ) : (
                  `Joined ${new Date(user!.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}`
                )}
              </Typography>
            </Box>

            {loading ? (
              <Skeleton width={100} height={20} sx={{ mt: 1 }} />
            ) : (
              <Link
                href={user!.html_url}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#0079ff",
                  fontWeight: 500,
                  display: "block",
                  marginTop: 8,
                }}
              >
                @{user?.login}
              </Link>
            )}
          </Box>

          {/* Bio */}
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={60}
              sx={{ mt: 1, mb: 2, bgcolor: mode === "light" ? "#E3E3E3" : "#2E3A5C" }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontSize: "14px",
                mb: "20px",
                color: textSecondary,
              }}
            >
              {user?.bio || "This profile has no bio"}
            </Typography>
          )}

          {/* Stats */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              textAlign: "center",
              backgroundColor: statsBg,
              borderRadius: 2,
              mt: 1,
              p: 2,
              gap: 1,
            }}
          >
            {["public_repos", "followers", "following"].map((key) => (
              <Box key={key}>
                <Typography fontSize={13} sx={{ color: textSecondary }}>
                  {key === "public_repos"
                    ? "Repos"
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                {loading ? (
                  <Skeleton
                    width={30}
                    height={20}
                    sx={{
                      mx: "auto",
                      bgcolor: mode === "light" ? "#E3E3E3" : "#2E3A5C",
                    }}
                  />
                ) : (
                  <Typography fontSize={20} fontWeight={700} sx={{ color: textPrimary }}>
                    {user?.[key]}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Footer info */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 1.5,
              mt: 2,
            }}
          >
            {[
              { icon: <LocationOnIcon fontSize="small" sx={{ color: textSecondary }} />, value: user?.location },
              { icon: <TwitterIcon fontSize="small" sx={{ color: textSecondary }} />, value: user?.twitter_username ? `@${user.twitter_username}` : null },
              { icon: <LinkIcon fontSize="small" sx={{ color: textSecondary }} />, value: user?.blog },
              { icon: <BusinessIcon fontSize="small" sx={{ color: textSecondary }} />, value: user?.company },
            ].map((item, idx) => (
              <Box display="flex" alignItems="center" gap={1} key={idx}>
                {item.icon}
                {loading ? (
                  <Skeleton width={80} sx={{ bgcolor: mode === "light" ? "#E3E3E3" : "#2E3A5C" }} />
                ) : item.value ? (
                  item.icon.type === LinkIcon ? (
                    <Link
                      href={
                        item.value.startsWith("http")
                          ? item.value
                          : `https://${item.value}`
                      }
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: textPrimary,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <Typography fontSize={14} sx={{ color: textPrimary }}>
                      {item.value}
                    </Typography>
                  )
                ) : (
                  <Typography fontSize={14} sx={{ color: textSecondary }}>
                    Not Available
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserCard;
