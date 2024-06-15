// HomeScreen.js
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { NoteContext } from '../context/NotesContext';
import { LabelContext } from '../context/LabelsContext';

const HomeScreen = ({ navigation, searchQuery, setSearchQuery }) => {
    const { notes } = useContext(NoteContext);
    const { labels } = useContext(LabelContext);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [showBookmarked, setShowBookmarked] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={24} color="#000" style={{ marginRight: 16 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        filterNotes();
    }, [searchQuery, showBookmarked, notes]);

    const filterNotes = () => {
        let filtered = notes.slice();

        if (searchQuery) {
            filtered = filtered.filter(note =>
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showBookmarked) {
            filtered = filtered.filter(note => note.isBookmarked);
        }

        setFilteredNotes(filtered);
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
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Icon name="search" size={24} color="#000" />
                </View>
            </View>

            <View style={styles.notesInfo}>
                <Text style={styles.notesCount}>{filteredNotes.length} notes</Text>
            </View>

            {filteredNotes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Not Found !</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
                            <View style={styles.noteContainer}>
                                <View style={styles.noteHeader}>
                                    <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                                    <Text style={styles.noteTime}>{formatTime(item.date)}</Text>
                                </View>
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
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewNote', { folderName: null })}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        marginRight: 10,
    },
    notesInfo: {
        padding: 15,
    },
    notesCount: {
        fontSize: 16,
        color: '#888',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    noteTime: {
        fontSize: 12,
        color: '#888',
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
    addButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        backgroundColor: '#3c9fff',
        borderRadius: 50,
        width: 60,
        height: 60,
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

export default HomeScreen;
