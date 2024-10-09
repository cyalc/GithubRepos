import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

interface RepoItemProps {
    name: string;
    stars: number;
    language: string;
}

function RepoItem({ name, stars, language }: RepoItemProps) {
    return (
        <ThemedView style={styles.container} >
            <ThemedText type='defaultSemiBold'>{name} </ThemedText>
            <ThemedView style={styles.details}>
                <ThemedText type='small'>⭐ {stars}</ThemedText>
                {language && <ThemedText type='small'>   •  {language}</ThemedText>}
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    details: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 4,
    },
});

export default RepoItem;
