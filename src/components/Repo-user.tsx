"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Box, Card, CardContent, Typography, Link, CircularProgress } from "@mui/material";
import { useGithub } from "../context/GithubContext";

const Repositories: React.FC = () => {
  const { repos, loadMoreRepos, loading, hasMore } = useGithub();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepoRef = useRef<HTMLDivElement | null>(null);

  const lastRepoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreRepos();
        }
      });

      if (node) observer.current.observe(node);
      lastRepoRef.current = node;
    },
    [loading, hasMore, loadMoreRepos]
  );

  

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {repos.map((r, index) => {
        const isLast = index === repos.length - 1;
        return (
          <Card
            ref={isLast ? lastRepoElementRef : null}
            key={r.id}
            sx={{ borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="h6">
                <Link href={r.html_url} target="_blank" underline="hover">
                  {r.name}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {r.description || "No description"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ⭐ {r.stargazers_count} | Forks: {r.forks_count} | Language:{" "}
                {r.language || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        );
      })}

      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={30} />
        </Box>
      )}
    </Box>
  );
};

export default Repositories;
