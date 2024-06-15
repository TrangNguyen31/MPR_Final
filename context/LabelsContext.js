import React, { createContext, useState } from 'react';
import { LABELS as initialLabels } from '../data/dummy-data'; // Import initial labels

export const LabelContext = createContext();

export const LabelProvider = ({ children }) => {
    const [labels, setLabels] = useState(initialLabels);

    const addLabel = (newLabel) => {
        const newLabels = [...labels, newLabel];
        setLabels(newLabels);
    };

    const editLabel = (labelId, newLabelName) => {
        const updatedLabels = labels.map(label =>
            label.id === labelId ? { ...label, label: newLabelName } : label
        );
        setLabels(updatedLabels);
    };

    const deleteLabel = (labelId) => {
        const updatedLabels = labels.filter(label => label.id !== labelId);
        setLabels(updatedLabels);
    };

    return (
        <LabelContext.Provider value={{ labels, addLabel, editLabel, deleteLabel }}>
            {children}
        </LabelContext.Provider>
    );
};
