import React, { createContext, useState } from 'react';

export const ElementContext = createContext();

export const ElementContextProvider = ({ children }) => {
    // Elements (Todo box) states
    const [elements, setElements] = useState([]);
    const [elementId, setElementId] = useState(1);
    const [refDict, setRefDict] = useState({});

    // Modal context
    const [modals, setModals] = useState([]);
    const [hideModal, setHideModal] = useState();

    // Creating a new element ID
    const newElementId = (elements) =>{
        setElementId(elementId + 1);
    }

    // Creating a new element input to array
    const newElement = () => {
        newElementId();
        if (!refDict[elementId]) {
          setElements(prev => [...prev, { boxtitle: '', boxid: elementId }]);
          setRefDict((prev) => ({...prev, [elementId]: true}));
        }
    };

    // Value transfer
    const value = {
        elements,
        setElements,
        newElement,
        elementId,
        modals,
        setModals,
        hideModal,
        setHideModal
    };

    return(
        <ElementContext.Provider value={value}>
            {children}
        </ElementContext.Provider>
    )
};