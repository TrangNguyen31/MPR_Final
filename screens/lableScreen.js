// LabelsScreen.js
import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { LabelContext } from '../context/LabelsContext';
import Label from '../models/lable';
import Icon from 'react-native-vector-icons/Ionicons';

const LabelsScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const { labels, addLabel, editLabel, deleteLabel } = useContext(LabelContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedLabels, setSelectedLabels] = useState([]);

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

    const addLabelHandler = () => {
        const newLabel = new Label(`l${labels.length + 1}`, search);
        addLabel(newLabel);
        setSearch('');
    };

    const editLabelHandler = (labelId, newLabelName) => {
        editLabel(labelId, newLabelName);
        setModalVisible(false);
    };

    const deleteLabelHandler = (labelId) => {
        deleteLabel(labelId);
        setModalVisible(false);
    };

    const openModal = (label) => {
        setSelectedLabel(label);
        setModalVisible(true);
    };

    const toggleLabelSelection = (labelId) => {
        setSelectedLabels((currentLabels) => {
            if (currentLabels.includes(labelId)) {
                return currentLabels.filter(id => id !== labelId);
            } else {
                return [...currentLabels, labelId];
            }
        });
    };

    const filteredLabels = labels.filter(label =>
        label.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Search or add label..."
                value={search}
                onChangeText={setSearch}
            />
            <Text style={styles.labelCountText}>
                {labels.length} total, {selectedLabels.length} selected
            </Text>
            {search.length > 0 && !filteredLabels.some(label => label.label.toLowerCase() === search.toLowerCase()) && (
                <TouchableOpacity style={styles.addButton} onPress={addLabelHandler}>
                    <Text style={styles.addButtonText}>Create "{search}"</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.labelItem, selectedLabels.includes(item.id) && styles.selectedLabelItem]}
                        onPress={() => toggleLabelSelection(item.id)}
                        onLongPress={() => openModal(item)}
                    >
                        <Text style={styles.labelText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.labelList}
            />
            {selectedLabel && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.textInput}
                                value={selectedLabel.label}
                                onChangeText={(text) => setSelectedLabel({ ...selectedLabel, label: text })}
                            />
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.saveButton} onPress={() => editLabelHandler(selectedLabel.id, selectedLabel.label)}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteLabelHandler(selectedLabel.id)}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
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
        marginBottom: 10,
    },
    labelCountText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: '#3c9fff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    labelList: {
        paddingVertical: 20,
    },
    labelItem: {
        backgroundColor: '#e0f7ff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 5,
    },
    selectedLabelItem: {
        backgroundColor: '#b3e5fc',
    },
    labelText: {
        fontSize: 16,
        color: '#007aff',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#3c9fff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
        marginRight: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#ff3c3c',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
        marginLeft: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LabelsScreen;
