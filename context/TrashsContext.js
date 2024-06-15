import React, { createContext, useState } from 'react';
import { TRASH } from '../data/dummy-data';

export const TrashContext = createContext();

export const TrashProvider = ({ children }) => {
    const [trashs, setTrashs] = useState(TRASH);

    const updateTrash = (newtrashs) => {
        setTrashs(newtrashs);
    };

    return (
        <TrashContext.Provider value={{ trashs, updateTrash }}>
            {children}
        </TrashContext.Provider>
    );
};
