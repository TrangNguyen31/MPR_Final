// components/Note.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Note = ({ content, labels }) => {
    return (
        <View style={styles.noteContainer}>
            <Text style={styles.noteContent}>{content}</Text>
            <View style={styles.labelsContainer}>
                {labels.map((label, index) => (
                    <Text key={index} style={styles.label}>
                        {label}
                    </Text>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    noteContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
    },
    noteContent: {
        fontSize: 18,
        marginBottom: 10,
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    label: {
        backgroundColor: '#e0e0e0',
        color: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 3,
        marginRight: 5,
        marginBottom: 5,
        fontSize: 14,
    },
});



export default Note;
