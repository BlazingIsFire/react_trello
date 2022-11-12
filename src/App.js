import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage'
import { ElementContextProvider } from './ElementContext';

function App() {
  return (
    <>
    <ElementContextProvider>
        <HomePage />
        <ToastContainer theme='colored'/>
    </ElementContextProvider>
    </>
  );
}

export default App;
