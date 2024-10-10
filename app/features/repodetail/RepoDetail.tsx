import { AppDispatch } from "@/app/store";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleRepo, RepoDetailStatus, selectRepoDetailState } from "./repoDetailSlice";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

type Params = {
    id: string;
}

interface InnerRepoDetailProps {
    name: string;
    stars: number;
    language: string;
}

export default function RepoDetail() {
    const { id } = useLocalSearchParams<Params>();
    const dispatch = useDispatch<AppDispatch>();
    const { repo, status, error } = useSelector(selectRepoDetailState);

    useEffect(() => {
        dispatch(fetchSingleRepo(id));
    }, [id]);

    return (
        <ThemedView style={styles.container}>
            {status === RepoDetailStatus.Loading && <ActivityIndicator size="large" color="#0a7ea4" />}
            {status === RepoDetailStatus.Fail && <ThemedText style={styles.errorText}>Error: {error}</ThemedText>}
            {status === RepoDetailStatus.Success && repo &&
                <InnerRepoDetail
                    name={repo.name}
                    stars={repo.stargazers_count}
                    language={repo.language}
                />}
        </ThemedView>
    )
}

function InnerRepoDetail({ name, stars, language }: InnerRepoDetailProps) {
    return (
        <ThemedView>
            <ThemedText type='title'>{name}</ThemedText>
            <ThemedView style={styles.space} />
            <ThemedText type="small">{stars} stars</ThemedText>
            <ThemedView style={styles.space} />
            <ThemedText type="small">{language}</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
    space: {
        height: 8
    }
});