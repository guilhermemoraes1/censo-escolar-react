import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Form, Modal} from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { object, string, number } from 'yup';
import { Formik } from 'formik';
import { usePropriedades } from '../contexts/PropriedadesContext';

const Propriedades = () => {
  const {propriedades, setPropriedades, show, handleShow, handleClose } = usePropriedades(); 

  let instituicoesSchema = object({
    Regiao: string().min(2).required(),
    NO_UF: string().min(2).max(3).required(),
    NO_MUNICIPIO: string().min(2).required(),
    NO_MESORREGIAO: string().min(2).required(),
    NO_MICRORREGIAO: string().min(2).required(),
    NO_ENTIDADE: string().min(2).min(5).required(),
    QT_MAT_BAS: number().required(),
    QT_MAT_INF: number().required(),
    QT_MAT_FUND: number().required(),
    QT_MAT_MED: number().required(),
    QT_MAT_EJA: number().required(),
    QT_MAT_ESP: number().required(),
  });

  // const handleChange = (event) => {
  //   let name = event.target.name;
  //   setInputs({ ...inputs, [name]: event.target.value });
  // };

  const handleSubmit = async (values) => {

    await instituicoesSchema.validate(inputs, { abortEarly: false });

    fetch('http://localhost:3000/instituicoes', {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
    .then((response) => {
        if (response.ok) {
            setPropriedades([values, ...propriedades]);
            handleClose();
            toast.success("Dados adicionados com sucesso.");
        }
    });

};


  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
            <button className='botao' onClick={handleShow}>Cadastrar Nova Escola No Formulário</button>
      </div>

      <PropriedadesTable
        propriedades={propriedades}
        setPropriedades={setPropriedades}
      ></PropriedadesTable>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className='botao'>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
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
          }}
          validationSchema={instituicoesSchema}
          onSubmit={handleSubmit}
     >
       {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                    type="text"
                    placeholder="Sítio Aruara"
                    id="Regiao"
                    name="Regiao"
                    value={values.Regiao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.Regiao && errors.Regiao}
                  />
                  {touched.Regiao && errors.Regiao && <div className="text-danger">{errors.Regiao}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    type="text"
                    id="NO_UF"
                    name="NO_UF"
                    value={values.NO_UF}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.NO_UF && errors.NO_UF}
                  />
                  {touched.NO_UF && errors.NO_UF && <div className="text-danger">{errors.NO_UF}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Control
                    type="text"
                    id="NO_MUNICIPIO"
                    name="NO_MUNICIPIO"
                    value={values.NO_MUNICIPIO}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.NO_MUNICIPIO && errors.NO_MUNICIPIO}
                  />
                  {touched.NO_MUNICIPIO && errors.NO_MUNICIPIO && <div className="text-danger">{errors.NO_MUNICIPIO}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mesorregião</Form.Label>
                  <Form.Control
                    type="text"
                    id="NO_MESORREGIAO"
                    name="NO_MESORREGIAO"
                    value={values.NO_MESORREGIAO}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.NO_MESORREGIAO && errors.NO_MESORREGIAO}
                  />
                  {touched.NO_MESORREGIAO && errors.NO_MESORREGIAO && <div className="text-danger">{errors.NO_MESORREGIAO}</div>}
                </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Microrregião"
                id="NO_MICRORREGIAO"
                name="NO_MICRORREGIAO"
                value={values.NO_MICRORREGIAO}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.NO_MICRORREGIAO && errors.NO_MICRORREGIAO}
              />
              {touched.NO_MICRORREGIAO && errors.NO_MICRORREGIAO && <div className="text-danger">{errors.NO_MICRORREGIAO}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Escola</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da escola"
                id="NO_ENTIDADE"
                name="NO_ENTIDADE"
                value={values.NO_ENTIDADE}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.NO_ENTIDADE && errors.NO_ENTIDADE}
              />
              {touched.NO_ENTIDADE && errors.NO_ENTIDADE && <div className="text-danger">{errors.NO_ENTIDADE}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Geral</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_BAS"
                name="QT_MAT_BAS"
                value={values.QT_MAT_BAS}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_BAS && errors.QT_MAT_BAS}
              />
              {touched.QT_MAT_BAS && errors.QT_MAT_BAS && <div className="text-danger">{errors.QT_MAT_BAS}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Infantil</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_INF"
                name="QT_MAT_INF"
                value={values.QT_MAT_INF}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_INF && errors.QT_MAT_INF}
              />
              {touched.QT_MAT_INF && errors.QT_MAT_INF && <div className="text-danger">{errors.QT_MAT_INF}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Fundamental</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_FUND"
                name="QT_MAT_FUND"
                value={values.QT_MAT_FUND}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_FUND && errors.QT_MAT_FUND}
              />
              {touched.QT_MAT_FUND && errors.QT_MAT_FUND && <div className="text-danger">{errors.QT_MAT_FUND}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Ensino Médio</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_MED"
                name="QT_MAT_MED"
                value={values.QT_MAT_MED}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_MED && errors.QT_MAT_MED}
              />
              {touched.QT_MAT_MED && errors.QT_MAT_MED && <div className="text-danger">{errors.QT_MAT_MED}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula EJA</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_EJA"
                name="QT_MAT_EJA"
                value={values.QT_MAT_EJA}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_EJA && errors.QT_MAT_EJA}
              />
              {touched.QT_MAT_EJA && errors.QT_MAT_EJA && <div className="text-danger">{errors.QT_MAT_EJA}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Especial</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_ESP"
                name="QT_MAT_ESP"
                value={values.QT_MAT_ESP}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.QT_MAT_ESP && errors.QT_MAT_ESP}
              />
              {touched.QT_MAT_ESP && errors.QT_MAT_ESP && <div className="text-danger">{errors.QT_MAT_ESP}</div>}
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <button className='botao' type="button" onClick={handleClose}>
              Fechar
            </button>
            <button className='botao' >
              Adicionar
            </button>
          </Modal.Footer>
        </Form>

       )}
     </Formik>
    </Modal>
      
    </>
  );
};

export default Propriedades;
