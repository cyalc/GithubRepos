import axios from "axios";
import Constants from "expo-constants";

const NETWORK_LOGGING = Constants.expoConfig?.extra?.networkLogging || false;

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

apiClient.interceptors.request.use((config) => {
    if (NETWORK_LOGGING) {
        console.log(`[Network Request] ${config.method?.toUpperCase()} ${config.url}`);
        console.log(`[Network Request Data] `, config.data);
    }
    return config;
});

apiClient.interceptors.response.use((response) => {
    if (NETWORK_LOGGING) {
        console.log(`[Network Response] ${response.status} ${response.config.url}`);
        console.log(`[Network Response Data] `, response.data);
    }
    return response;
});

export async function getRepos(username: string): Promise<Repo[]> {
    const response = await apiClient.get<Repo[]>(`/users/${username}/repos`);
    return response.data;
}

export async function getSingleRepo(repoId: string): Promise<Repo> {
    const response = await apiClient.get<Repo>(`/repositories/${repoId}`);
    return response.data;
}