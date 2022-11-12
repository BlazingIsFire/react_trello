import React, { createContext, useState } from 'react';
import Item from './Item';

export const ItemContext = createContext();

export const ItemContextProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(1);
    const [itemData, setItemData] = useState(); 
    const [refDict, setRefDict] = useState({});

    const newItemId = (items) =>{
        setItemId(itemId + 1);
        console.log(itemId)
    }

    const newItem = (itemChange) => {
        newItemId();
        if (!refDict[itemId]) {
          setItems(prev => [...prev, { itemdata: itemChange, itemid: itemId }]);
          setRefDict((prev) => ({...prev, [itemId]: true}));
        }
        console.log(items);
    };

    const value = {
        items,
        setItems,
        newItem,
        itemId
    };

    return(
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    )
};