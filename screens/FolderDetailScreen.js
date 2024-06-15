import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NoteContext } from '../context/NotesContext';
import { LabelContext } from '../context/LabelsContext';
import moment from 'moment';

const FolderDetailScreen = ({ route }) => {
    const { folderName } = route.params;
    const { notes, updateNotes } = useContext(NoteContext);
    const { labels } = useContext(LabelContext);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" style={{ marginLeft: 16 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const notesInFolder = notes.filter(note => note.folder === folderName);

    const renderNoteItem = ({ item }) => (
        <TouchableOpacity style={[styles.noteItem, { backgroundColor: item.color }]} onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                    <Icon name={item.isBookmarked ? "bookmark" : "bookmark-outline"} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNoteHandler(item.id)}>
                    <Icon name="delete" size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.noteFooter}>
                <FlatList
                    data={getLabelNames(item.labelIds)}
                    keyExtractor={(label, index) => index.toString()}
                    renderItem={({ item: label }) => (
                        <Text style={styles.label}>{label}</Text>
                    )}
                    horizontal
                />
                <Text style={styles.noteTime}>{formatTime(item.date)}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleAddNote = () => {
        navigation.navigate('NewNote', { folderName });
    };

    const toggleBookmark = (noteId) => {
        const updatedNotes = notes.map(note =>
            note.id === noteId ? { ...note, isBookmarked: !note.isBookmarked } : note
        );
        updateNotes(updatedNotes);
    };

    const deleteNoteHandler = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        updateNotes(updatedNotes);
    };

    const getLabelNames = (labelIds) => {
        return labelIds.map(labelId => {
            const label = labels.find(label => label.id === labelId);
            return label ? label.label : null;
        }).filter(labelName => labelName !== null);
    };

    const formatTime = (date) => {
        return moment(date).fromNow();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{folderName}</Text>
            <FlatList
                data={notesInFolder}
                keyExtractor={(item) => item.id}
                renderItem={renderNoteItem}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Empty folder!</Text>
                        <TouchableOpacity style={styles.addNoteButton} onPress={handleAddNote}>
                            <Text style={styles.addNoteButtonText}>Create Note</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        position: 'relative',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10,
    },
    noteContent: {
        fontSize: 16,
        marginBottom: 8,
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    label: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 5,
        fontSize: 12,
    },
    noteTime: {
        fontSize: 12,
        color: '#888',
    },
    addButton: {
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 3,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    addNoteButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    addNoteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default FolderDetailScreen;
