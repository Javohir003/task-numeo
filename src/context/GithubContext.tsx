"use client";

import React, { createContext, useContext, useState, useRef } from "react";
import { toast } from "react-toastify";

interface GithubUser {
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  [key: string]: any;
}

interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string;
  [key: string]: any;
}

interface GithubContextProps {
  userData: GithubUser | null;
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
  fetchGithubUser: (username: string) => void;
  loadMoreRepos: () => void;
  hasMore: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const GithubContext = createContext<GithubContextProps | undefined>(undefined);

export const GithubProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const currentUsername = useRef<string>("");

  const fetchGithubUser = async (username: string) => {
    if (!username) {
      setUserData(null);
      setRepos([]);
      setError(null);
      setHasMore(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      currentUsername.current = username;

      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_GITHUB_TOKEN}/users/${username}`
      );

      if (userRes.status === 403) {
        toast.warning("GitHub API limit qolmadi! Keyinroq urinib kuring");
        throw new Error("403");
      }

      if (userRes.status === 404) {
        toast.error("❌ User not found!");
        throw new Error("404");
      }

      if (!userRes.ok) {
        toast.error("⚠️ Server error occurred!");
        throw new Error("Server error");
      }

      const userData = await userRes.json();

      const repoRes = await fetch(
        `${process.env.NEXT_PUBLIC_GITHUB_TOKEN}/users/${username}/repos?per_page=7&page=1`
      );

      if (!repoRes.ok) {
        toast.error("⚠️ Could not load repositories!");
        throw new Error("Repo error");
      }

      const repoData = await repoRes.json();

      setUserData(userData);
      setRepos(repoData);
      setPage(1);
      setHasMore(repoData.length === 7);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Scroll paytida keyingi 7 tadan yuklash
  const loadMoreRepos = async () => {
    if (!currentUsername.current || !hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GITHUB_TOKEN}/users/${currentUsername.current}/repos?page=${nextPage}&per_page=7`
      );
      const newRepos = await res.json();

      if (Array.isArray(newRepos) && newRepos.length > 0) {
        setRepos((prev) => [...prev, ...newRepos]);
        setPage(nextPage);
        setHasMore(newRepos.length === 7);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        userData,
        repos,
        loading,
        error,
        fetchGithubUser,
        loadMoreRepos,
        hasMore,
        setError,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => {
  const context = useContext(GithubContext);
  if (!context)
    throw new Error("useGithub must be used within a GithubProvider");
  return context;
};
