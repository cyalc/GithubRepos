import { useCallback, useEffect, useState } from "react";
import { getRepos, Repo } from "../services/github";

interface UseGithubReposResult {
    repos: Repo[];
    isLoading: boolean;
    error: string | null;
}

export function useGithubRepos(username: string): UseGithubReposResult {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getRepost = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getRepos(username);
            setRepos(response);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        getRepost();
    }, [getRepost]);

    return { repos, isLoading, error };
}