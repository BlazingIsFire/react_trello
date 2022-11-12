import React, { createContext } from 'react';
import Item from './Item';
import { useState, useContext } from 'react';
import '../App.css';
import trash from '../trash_can.png'
import { ElementContext } from '../ElementContext';
import { toast } from 'react-toastify';

export const ItemContext = createContext();

export const ItemContextProvider = ({ children }) => {
    // Item array states
    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(1);
    const [refDict, setRefDict] = useState({});

    // Creating a new Item ID
    const newItemId = (items) =>{
        setItemId(itemId + 1);
    }

    // Creating a new item in the array
    const newItem = (itemChange, boxid) => {
        newItemId();
        if (!refDict[itemId]) {
          setItems(prev => [...prev, { itemboxid: boxid, itemdata: itemChange, itemid: itemId }]);
          setRefDict((prev) => ({...prev, [itemId]: true}));
        }
        toast.info('Item has been added!')
    };

    // Value transfer
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

export default function Todobox({ boxtitle, boxid }){
    // Context inputs
    const { elements, setElements } = useContext(ElementContext);
    const { items, setItems, newItem } = useContext(ItemContext);
    const [boxheader, setBoxHeader] = useState('');
    const [itemChange, setItemChange] = useState({});

    // Sets state of header input
    const handleChange = (e) => {
        setBoxHeader(e.target.value);
    }

    // Updates ToDo box title on enter
    const handleKeydown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false){
            setElements(elements.map(element => {
                if (element.boxid === boxid) {
                  setBoxHeader(e.target.value)
                  return { ...element, boxtitle: boxheader };
                } else {
                  return element;
                }
              }))
            e.preventDefault();
            toast.info(`List title updated to: ${boxheader}`)
        }
    }

    // Handles delete of ToDo box
    const handleDelete = (e) => {
        setElements(elements.filter(element => element.boxid !== boxid))
        setItems(items.filter(item => item.itemboxid !== boxid))
    }

    // Set ItemChange state to input
    const handleItemChange = (e) =>{
        setItemChange(e.target.value);
    }

    // Calls newItem to input a new Item to array
    const handleNewItem = (e) =>{
        if(e.keyCode === 13 && e.shiftKey === false){
            newItem(itemChange, boxid)
            e.preventDefault();
            e.target.value = '';
        }
    }
    
    return(
        <>
        <div className='element-box'>
            <img src={trash} className='element-box-trash' onClick={handleDelete} alt='Trash can'></img>
            <textarea className='element-title-input' placeholder='Add title...' onChange={handleChange} onKeyDown={handleKeydown} value={boxheader}></textarea>
            {items.map(item => {
                if(item.itemboxid === boxid){
                    return <Item key={item.itemid} itemid={item.itemid} itemdata={item.itemdata}/>;
                } else if(item.itemboxid !== boxid){
                    return null;
                }
            })}
            <textarea 
            className='element-input' 
            type='text' 
            placeholder={'Add item...'}
            onChange={handleItemChange}
            onKeyDown={handleNewItem}
            />
        </div>
        </>
    )
}