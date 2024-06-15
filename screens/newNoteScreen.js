// NewNoteScreen.js
import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NoteContext } from '../context/NotesContext';
import Note from '../models/note';

const NewNoteScreen = ({ navigation, route }) => {
    const { notes, updateNotes } = useContext(NoteContext);
    const { folderName } = route.params;
    const [content, setContent] = useState('');

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

    const addNoteHandler = () => {
        const newNote = new Note(
            `n${notes.length + 1}`,
            null,
            [],
            content,
            new Date(),
            false,
            folderName,
        );
        const newNotes = [...notes, newNote];
        updateNotes(newNotes);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="New note's content"
                value={content}
                onChangeText={setContent}
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={addNoteHandler}
            >
                <Icon name="checkmark" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    saveButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: '#3c9fff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default NewNoteScreen;
