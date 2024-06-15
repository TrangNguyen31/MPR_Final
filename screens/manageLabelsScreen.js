// manageLabelsScreen.js
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LabelContext } from '../context/LabelsContext';
import Icon from 'react-native-vector-icons/Ionicons';

const ManageLabelsScreen = ({ navigation, route }) => {
    const { selectedLabels: initialSelectedLabels, onLabelsSelected } = route.params;
    const [selectedLabels, setSelectedLabels] = useState(initialSelectedLabels || []);
    const [searchText, setSearchText] = useState('');
    const { labels } = useContext(LabelContext);

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

    useEffect(() => {
        if (route.params && route.params.selectedLabels) {
            setSelectedLabels(route.params.selectedLabels);
        }
    }, [route.params]);

    const toggleLabelSelection = (labelId) => {
        setSelectedLabels((currentLabels) => {
            if (currentLabels.includes(labelId)) {
                return currentLabels.filter((id) => id !== labelId);
            } else {
                return [...currentLabels, labelId];
            }
        });
    };

    const saveLabels = () => {
        if (onLabelsSelected) {
            onLabelsSelected(selectedLabels);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBox}
                placeholder="Search or create label..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={labels}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.labelContainer,
                            selectedLabels.includes(item.id) && styles.selectedLabelContainer,
                        ]}
                        onPress={() => toggleLabelSelection(item.id)}
                    >
                        <Text style={styles.labelText}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.labelsList}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveLabels}>
                <Text style={styles.saveButtonText}>Save Labels</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchBox: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    labelsList: {
        flexGrow: 1,
    },
    labelContainer: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    selectedLabelContainer: {
        backgroundColor: '#d0e8ff',
        borderColor: 'blue',
    },
    labelText: {
        fontSize: 16,
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ManageLabelsScreen;
