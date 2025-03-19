import React, { createContext, useState, useContext } from 'react';

const PropriedadesContext = createContext();

export const PropriedadesProvider = ({ children }) => {

  const [propriedades, setPropriedades] = useState([]);
  const [inputs, setInputs] = useState({
    Regiao: '',
    NO_UF: '',
    NO_MUNICIPIO: '',
    NO_MESORREGIAO: '',
    NO_MICRORREGIAO: '',
    NO_ENTIDADE: '',
    QT_MAT_BAS: '',
    QT_MAT_INF: '',
    QT_MAT_FUND: '',
    QT_MAT_MED: '',
    QT_MAT_EJA: '',
    QT_MAT_ESP: ''
  });
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (event) => {
    let name = event.target.name;
    setInputs({ ...inputs, [name]: event.target.value });
  };

  return (
    <PropriedadesContext.Provider value={{
      propriedades,
      setPropriedades,
      inputs,
      setInputs,
      show,
      setShow,        
      handleShow,     
      handleClose,    
      handleChange    
    }}>
      {children}
    </PropriedadesContext.Provider>
  );
};

export const usePropriedadesContext = () => {
  return useContext(PropriedadesContext);
};
