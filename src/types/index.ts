export type RepoListType = {
    id: string | number;
    owner: {
        avatar_url: string;
    };
    full_name: string;
    description: string;
    html_url: string;
}

export interface GitHubRepoListResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepoListType[];
}