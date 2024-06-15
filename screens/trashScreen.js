// TrashScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NoteContext } from '../context/NotesContext';
import { TrashContext } from '../context/TrashsContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { LabelContext } from '../context/LabelsContext';
import moment from 'moment';

const TrashScreen = () => {
    const { notes, updateNotes } = useContext(NoteContext);
    const { trashs, updateTrash } = useContext(TrashContext);
    const { labels } = useContext(LabelContext);

    const restoreNoteHandler = (noteId) => {
        const noteIndex = trashs.findIndex(n => n.id === noteId);
        const note = trashs.splice(noteIndex, 1)[0];
        updateTrash([...trashs]);
        updateNotes([...notes, note]);
    };

    const deleteNoteHandler = (noteId) => {
        const noteIndex = trashs.findIndex(n => n.id === noteId);
        trashs.splice(noteIndex, 1);
        updateTrash([...trashs]);
    };

    const restoreAllHandler = () => {
        while (trashs.length > 0) {
            const note = trashs.pop();
            updateNotes([...notes, note]);
        }
        updateTrash([]);
    };

    const emptyTrashHandler = () => {
        updateTrash([]);
    };

    const showActionDialog = (noteId) => {
        Alert.alert(
            "Choose an action",
            "",
            [
                { text: "Restore", onPress: () => restoreNoteHandler(noteId) },
                { text: "Delete permanently", onPress: () => deleteNoteHandler(noteId), style: "destructive" },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = labels.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const formatTime = (date) => {
        return moment(date).format('LLL');
    };

    const renderNote = ({ item }) => (
        <TouchableOpacity onPress={() => showActionDialog(item.id)} style={styles.note}>
            <View style={styles.noteContentContainer}>
                <Text style={styles.noteContent}>{item.content}</Text>
                <View style={styles.noteFooter}>
                    <FlatList
                        data={getLabelNames(item.labelIds)}
                        keyExtractor={(label, index) => index.toString()}
                        renderItem={({ item: label }) => (
                            <Text style={styles.label}>{label}</Text>
                        )}
                        horizontal
                    />
                    {item.isBookmarked && <Icon name="bookmark" size={20} color="#000" />}
                </View>
                <Text style={styles.noteTime}>{formatTime(item.date)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{trashs.length} notes in trash</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.headerButton} onPress={restoreAllHandler}>
                        <Text style={styles.headerButtonText}>Restore</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={emptyTrashHandler}>
                        <Text style={styles.headerButtonText}>Empty</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={trashs}
                keyExtractor={(item) => item.id}
                renderItem={renderNote}
                contentContainerStyle={styles.notesList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        color: '#333',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#3c9fff',
        borderRadius: 4,
    },
    headerButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    notesList: {
        flexGrow: 1,
    },
    note: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteContentContainer: {
        padding: 15,
    },
    noteContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        marginRight: 5,
        fontSize: 12,
    },
    noteTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 10,
    },
});

export default TrashScreen;
