import React, { useContext } from 'react';
import '../App.css';
import '../index.css';
import { ElementContext } from '../ElementContext';

export default function Item({ itemid, itemdata }){
    // Context inputs
    const { setHideModal, setModals } = useContext(ElementContext);

    // Creates a new modal display
    const handleNewModal = () => {
        setHideModal(false)
        document.body.style.overflow = 'hidden';
        setModals(prev => [...prev, { modalItemId: itemid, modalId: '1', modalData: itemdata }]);
    };

    return(
        <div className='item-container' onClick={handleNewModal}>
            <a className='item-text'>{`${itemdata}`}</a>
        </div>
    )
}