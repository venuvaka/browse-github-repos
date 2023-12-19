import { GitHubRepoListResponse } from "../types"

export const fetchGitHubRepoList = (page: number): Promise<GitHubRepoListResponse> => {
    return (
        fetch(`https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=10&page=${page}`)
        .then(res => res.json())
        .catch(error => console.log(error))
    )
}