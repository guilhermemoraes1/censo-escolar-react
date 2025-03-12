import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Form, Modal} from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { object, string, number } from 'yup';

const Propriedades = () => {
  let [propriedades, setPropriedades] = useState([]);

  let [show, setShow] = useState(false);
  const handleShow = () => setShow(true); 

  const handleClose = () => setShow(false);

  let [inputs, setInputs] = useState({
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

  const handleChange = (event) => {
    let name = event.target.name;
    setInputs({ ...inputs, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        await instituicoesSchema.validate(inputs, { abortEarly: false });

        fetch('http://localhost:3000/instituicoes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        })
        .then((response) => {
            if (response.ok) {
                setPropriedades([inputs, ...propriedades]);
                setShow(!show);
                toast.success("Dados adicionados com sucesso.");
            }
        });
    } catch (err) {
        console.log(err.errors);
        toast.error(err.errors[0]);
    }
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
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sítio Aruara"
                id="Regiao"
                name="Regiao"
                value={inputs.Regiao}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                id="NO_UF"
                name="NO_UF"
                value={inputs.NO_UF}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Municipio</Form.Label>
              <Form.Control
                type="text"
                id="NO_MUNICIPIO"
                name="NO_MUNICIPIO"
                value={inputs.NO_MUNICIPIO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesorregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Mesorregião"
                id="NO_MESORREGIAO"
                name="NO_MESORREGIAO"
                value={inputs.NO_MESORREGIAO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da Microrregião"
                id="NO_MICRORREGIAO"
                name="NO_MICRORREGIAO"
                value={inputs.NO_MICRORREGIAO}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Escola</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome da escola"
                id="NO_ENTIDADE"
                name="NO_ENTIDADE"
                value={inputs.NO_ENTIDADE}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Geral</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_BAS"
                name="QT_MAT_BAS"
                value={inputs.QT_MAT_BAS}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Infantil</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_INF"
                name="QT_MAT_INF"
                value={inputs.QT_MAT_INF}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Fundamental</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_FUND"
                name="QT_MAT_FUND"
                value={inputs.QT_MAT_FUND}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Ensino Médio</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_MED"
                name="QT_MAT_MED"
                value={inputs.QT_MAT_MED}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula EJA</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_EJA"
                name="QT_MAT_EJA"
                value={inputs.QT_MAT_EJA}
                onChange={handleChange}
              />
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Especial</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                id="QT_MAT_ESP"
                name="QT_MAT_ESP"
                value={inputs.QT_MAT_ESP}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className='botao' type="button" onClick={handleClose}>
              Fechar
            </button>
            <button className='botao' type="submit" >
              Adicionar
            </button>
          </Modal.Footer>
        </Form>
        
      </Modal>
      
    </>
  );
};

export default Propriedades;
