import React, { useContext, useState } from 'react';
import '../App.css';
import { ItemContext } from './Todobox';
import trash from '../trash_can.png'
import { ElementContext } from '../ElementContext';
import { toast } from 'react-toastify';

export default function ModifyModal({ modalData, modalItemId }){
    // Context inputs
    const { hideModal, setHideModal, setModals } = useContext(ElementContext);
    const { items, setItems } = useContext(ItemContext);
    const [inputChange, setInputChange] = useState();

    // Sets inputChange state
    const handleInputChange = (e) =>{
        setInputChange(e.target.value);
    }
    
    // Updates items data
    const handleUpdateItem = () =>{
        setItems(items.map(item => {
            if (item.itemid === modalItemId) {
              return { ...item, itemdata: inputChange };
            } else {
              return item;
            }
          }))
        document.body.style.overflow = 'auto';
        setHideModal(true);
        toast.success('Item has been updated!')
    }

    // Closes modal and resets array
    const handleModalCancel = () =>{
        document.body.style.overflow = 'auto';
        setHideModal(true);
        setModals([]);
    }

    // Removes / deletes item from array
    const handleModalItemDelete = () =>{
        setItems(items.filter(item => item.itemid !== modalItemId))
        setHideModal(true);
        setModals([]);
        document.body.style.overflow = 'auto';
        toast.success('Item has been removed!')
    }

    return(
        <div className={`modify-modal-container ${hideModal ? 'modify-modal-container-hide' : ''}`}>
            <div className='modify-modal'>
                <a className='modify-title'>Modify the item:</a>
                <textarea 
                    className='modify-input'
                    onChange={handleInputChange}
                    defaultValue={modalData}
                />
                    <div className='modify-buttons'>
                        <a className='modify-btn' id='modify-update-btn' onClick={handleUpdateItem}>Update</a>
                        <a className='modify-btn' id='modify-cancel-btn' onClick={handleModalCancel}>Cancel</a>
                        <img src={trash} id='modify-delete' onClick={handleModalItemDelete} alt='Trash can'/>
                    </div>
            </div>
        </div>
    )
}