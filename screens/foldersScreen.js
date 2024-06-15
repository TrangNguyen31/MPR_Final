import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NoteContext } from '../context/NotesContext';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const FoldersScreen = () => {
    const [folderName, setFolderName] = useState('');
    const { notes, updateNotes } = useContext(NoteContext);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" style={{ marginLeft: 16 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={24} color="#000" style={{ marginRight: 16 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const addFolderHandler = () => {
        if (folderName.trim()) {
            const newFolderNote = {
                id: `f${notes.length + 1}`, // Generate a unique id for the folder
                content: '',
                date: new Date(),
                isBookmarked: false,
                folder: folderName,
                labelIds: [],
                color: getRandomColor(), // Assign a random color to the folder
            };
            updateNotes([...notes, newFolderNote]);
            setFolderName('');
        }
    };

    const getRandomColor = () => {
        const colors = ['#f2c7cd', '#bddcf2', '#9ff5a6', '#f5ed95', '#f2cb8d', '#e88ef5', '#7de7f5', '#f28a7e'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const groupedNotes = notes.reduce((acc, note) => {
        const folder = note.folder || 'Uncategorized';
        if (!acc[folder]) {
            acc[folder] = [];
        }
        acc[folder].push(note);
        return acc;
    }, {});

    const folders = Object.keys(groupedNotes).map(folder => ({
        name: folder,
        notes: groupedNotes[folder],
    }));

    const getLastModifiedTime = (notes) => {
        return notes.reduce((latest, note) => note.date > latest ? note.date : latest, new Date(0));
    };

    const formatTime = (date) => {
        return moment(date).fromNow();
    };

    const navigateToFolderDetail = (folderName) => {
        navigation.navigate('FolderDetail', { folderName });
    };

    return (
        <View style={styles.container}>
            <View style={styles.addFolderContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Folder Name"
                    value={folderName}
                    onChangeText={setFolderName}
                />
                <TouchableOpacity style={styles.addButton} onPress={addFolderHandler}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.folderItem} onPress={() => navigateToFolderDetail(item.name)}>
                        <Text style={styles.folderText}>{item.name}</Text>
                        <Text style={styles.noteCount}>{item.notes.length} notes</Text>
                        <Text style={styles.timeStamp}>{formatTime(getLastModifiedTime(item.notes))}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    folderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    folderText: {
        fontSize: 18,
        flex: 1,
    },
    noteCount: {
        fontSize: 14,
        color: '#888',
    },
    timeStamp: {
        fontSize: 14,
        color: '#888',
    },
    addFolderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 4,
    },
    addButton: {
        marginLeft: 16,
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default FoldersScreen;
