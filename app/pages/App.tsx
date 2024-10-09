import { ThemedView } from "@/components/ThemedView";
import RepoItem from "../appcomponents/RepoItem";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { ActivityIndicator, FlatList } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet } from 'react-native';

const USERNAME = 'cyalc';

export default function App() {
    const { repos, isLoading, error, } = useGithubRepos(USERNAME);

    const renderItem = ({ item }: { item: typeof repos[0] }) => (
        <RepoItem name={item.name} stars={item.stargazers_count} language={item.language} />
    );

    if (isLoading) {
        return (
            <ThemedView style={styles.centered}>
                <ActivityIndicator size="large" color="#0a7ea4" />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.centered}>
                <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={repos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <ThemedText style={styles.emptyText}>No repositories found.</ThemedText>
                }
                contentContainerStyle={repos.length === 0 && styles.emptyContainer}
            />
        </ThemedView>);
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
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});