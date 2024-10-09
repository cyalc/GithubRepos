import axios from "axios";

export interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
    language: string;
}

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const apiClient = axios.create({
    baseURL: GITHUB_API_BASE_URL,
    timeout: 10000,
});

export async function getRepos(username: string): Promise<Repo[]> {
    const response = await apiClient.get<Repo[]>(`/users/${username}/repos`);
    return response.data;
}

export async function getSingleRepo(repoId: string): Promise<Repo> {
    const response = await apiClient.get<Repo>(`/repositories/${repoId}`);
    return response.data;
}