import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, StyleSheet, View } from 'react-native';

import HomeScreen from './screens/homeScreen';
import LabelsScreen from './screens/lableScreen';
import FoldersScreen from './screens/foldersScreen';
import TrashScreen from './screens/trashScreen';
import NewNoteScreen from './screens/newNoteScreen';
import EditNoteScreen from './screens/editNoteScreen';
import ManageLabelsScreen from './screens/manageLabelsScreen';
import { LabelProvider } from './context/LabelsContext';
import { NoteProvider } from './context/NotesContext';
import FolderDetailScreen from './screens/FolderDetailScreen';
import { TrashProvider } from './context/TrashsContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack({ searchQuery, setSearchQuery }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen">
        {props => <HomeScreen {...props} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      </Stack.Screen>
      <Stack.Screen name="NewNote" component={NewNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="FolderDetail" component={FolderDetailScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NavigationContainer>
      <NoteProvider>
        <TrashProvider>
          <LabelProvider>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home">
                {props => <HomeStack {...props} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
              </Drawer.Screen>
              <Drawer.Screen name="Labels" component={LabelsScreen} />
              <Drawer.Screen name="Folders" component={FoldersScreen} />
              <Drawer.Screen name="Trash" component={TrashScreen} />
            </Drawer.Navigator>
          </LabelProvider>
        </TrashProvider>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    width: 250,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
});

export default App;
