import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepos, RepoListStatus, selectRepoListState } from "./repoListSlice";
import { AppDispatch } from "../../store";
import { ActivityIndicator, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { Repo } from "../../services/github";
import RepoItem from "../../appcomponents/RepoItem";
import { Link } from "expo-router";


const USERNAME = 'cyalc';

export default function RepoList() {
    const [userName, setUserName] = useState<string>(USERNAME);
    const dispatch = useDispatch<AppDispatch>();
    const { repos, status, error } = useSelector(selectRepoListState);

    useEffect(() => {
        dispatch(fetchRepos(userName));
    }, [userName]);


    const renderItem = ({ item }: { item: Repo }) => (
        <Link
            href={{
                pathname: '/features/repodetail/RepoDetail',
                params: { id: item.id.toString() }
            }}>
            <RepoItem name={item.name} stars={item.stargazers_count} language={item.language} />
        </Link>

    );

    return (
        <ThemedView style={styles.container}>
            {status === RepoListStatus.Loading && <ActivityIndicator size="large" color="#0a7ea4" />}
            {status === RepoListStatus.Fail && <ThemedText style={styles.errorText}>Error: {error}</ThemedText>}
            {status === RepoListStatus.Success && <FlatList
                data={repos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <ThemedText style={styles.emptyText}>No repositories found.</ThemedText>
                }
                contentContainerStyle={repos.length === 0 && styles.centered}
            />}
        </ThemedView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
