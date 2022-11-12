import { useContext } from 'react';
import '../App.css';
import Todobox from './Todobox';
import { ElementContext } from '../ElementContext';
import { ItemContextProvider } from './Todobox';
import ModifyModal from './ModifyModal';

export default function HomePage(){
  // Context inputs
  const { elements, newElement } = useContext(ElementContext);
  const { modals } = useContext(ElementContext);

  return(
    <ItemContextProvider>
      <div className='page-container'>
        <div className='header'>
          <a className='header-title'>Trello Clone!</a>
          <a className='header-sub-title'>By: Andrew Schweitzer</a>
          <a className='header-button' onClick={newElement}>Create a list</a>
        </div>
        <div className='element-field'>
          {elements.map((element => <Todobox key={element.boxid} boxid={element.boxid} boxtitle={element.boxtitle} />))}
        </div>
      </div>
  {modals.map(((modal, i) => <ModifyModal key={i} modalData={modal.modalData} modalItemId={modal.modalItemId}/>))}
  </ItemContextProvider>
  )
}