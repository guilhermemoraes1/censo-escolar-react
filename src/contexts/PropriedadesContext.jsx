import React, { createContext, useState, useContext } from 'react';

const PropriedadesContext = createContext();

export const PropriedadesProvider = ({ children }) => {

  const [propriedades, setPropriedades] = useState([]);
  const [show, setShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => setShowEdit(!showEdit);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <PropriedadesContext.Provider value={{
      propriedades,
      setPropriedades,
      show,
      setShow,        
      handleShow,     
      handleClose,
      showEdit,
      handleShowEdit
    }}>
      {children}
    </PropriedadesContext.Provider>
  );
};

export const usePropriedadesContext = () => {
  return useContext(PropriedadesContext);
};