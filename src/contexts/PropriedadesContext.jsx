import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
const PropriedadesContext = createContext();

// Componente Provedor para envolver o aplicativo
export const PropriedadesProvider = ({ children }) => {
  const [propriedades, setPropriedades] = useState([]);
  const [show, setShow] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editItem, setEditItem] = useState(null); 
  const [formData, setFormData] = useState({});  

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleMudancaPagina = (event, novaPagina) => {
    setPagina(novaPagina);
  };

  const handleMudancaLinhasPorPagina = (event) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const setEditItemState = (propriedade) => {
    setEditItem(propriedade);
    setFormData({ ...propriedade });
    setShow(true);
  };

  const setFormDataState = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <PropriedadesContext.Provider value={{
      propriedades,
      setPropriedades,
      show,
      handleShow,
      handleClose,
      pagina,
      setPagina,
      linhasPorPagina,
      setLinhasPorPagina,
      totalPosts,
      setTotalPosts,
      editItem,
      setEditItem: setEditItemState,
      formData,
      setFormData: setFormDataState,
      handleMudancaPagina,
      handleMudancaLinhasPorPagina
    }}>
      {children}
    </PropriedadesContext.Provider>
  );
};

// Hook para consumir o contexto
export const usePropriedades = () => {
  const context = useContext(PropriedadesContext);
  if (!context) {
    throw new Error("usePropriedades deve ser usado dentro de um PropriedadesProvider");
  }
  return context;
};
