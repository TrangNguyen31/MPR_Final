import React, { createContext, useState } from 'react';
import { NOTES } from '../data/dummy-data'; // Import initial labels


export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState(NOTES);

    const updateNotes = (newNotes) => {
        setNotes(newNotes);
    };

    return (
        <NoteContext.Provider value={{ notes, updateNotes }}>
            {children}
        </NoteContext.Provider>
    );
};
