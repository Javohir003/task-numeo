export interface GithubUser {
  login: string;         // GitHub username
  id?: number;            // GitHub user ID
  avatar_url: string;    // Avatar rasmi URL
  name?: string;         // Foydalanuvchi ismi
  bio?: string;          // Bio
  followers?: number;    // Followers soni
  following?: number;    // Following soni
  location?: string;     // Joylashuv
  company?: string;      // Kompaniya
  blog?: string;         // Blog / website
  public_repos?: number; // Public repos soni
  // boshqa qo‘shimcha maydonlar ham bo‘lishi mumkin
  [key: string]: any;
}




export type GitHubOwner = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
};

export type GitHubRepo = {
  id?: number;
  node_id?: string;
  name: string;
  full_name?: string;
  private?: boolean;
  owner?: GitHubOwner;
  html_url: string;
  description?: string | null;
  fork?: boolean;
  url?: string;
  language?: string | null;
  stargazers_count?: number;
  watchers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  default_branch?: string;
  created_at?: string;
  updated_at?: string;
  pushed_at?: string;
  homepage?: string | null;
};
