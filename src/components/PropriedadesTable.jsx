import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { toast } from 'react-toastify';
import { Modal, Form } from 'react-bootstrap';
import '../App.css';
import { usePropriedades } from '../contexts/PropriedadesContext';
import { object, string, number } from 'yup';
import { Formik } from 'formik';

const PropriedadesTable = () => {
  const {
    propriedades,
    setPropriedades,
    show,
    pagina,
    linhasPorPagina,
    totalPosts,
    setTotalPosts,
    editItem,
    setEditItem,
    formData,
    setFormData,
    handleMudancaPagina,
    handleMudancaLinhasPorPagina
  } = usePropriedades();  

  const getPropriedades = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/instituicoes?_page=${pagina + 1}&_limit=${linhasPorPagina}`
      );
      const data = await res.json();
      const totalItems = res.headers.get("X-Total-Count");

      setPropriedades(data);
      setTotalPosts(Number(totalItems));
    } catch (error) {
      toast.error('Deu erro!', error);
    }
  };

  useEffect(() => {
    getPropriedades();
  }, [pagina, linhasPorPagina]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/instituicoes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPropriedades(propriedades.filter((propriedade) => propriedade.id !== id));
        toast.success("Item deletado com sucesso!");
      } else {
        toast.error("Erro ao deletar item");
      }
    } catch (error) {
      console.log('Erro ao deletar a propriedade:', error);
      toast.error('Ocorreu um erro');
    }
  };

  const handleEdit = (propriedade) => {
    setEditItem(propriedade);
    setFormData({ ...propriedade });
    setShow(true); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/instituicoes/${editItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setPropriedades(propriedades.map(item => item.id === updatedData.id ? updatedData : item));
        toast.success("Item atualizado com sucesso!");
        setShow(false);
        setEditItem(null);
      } else {
        toast.error("Erro ao atualizar item");
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
      toast.error("Erro ao editar item");
    }
  };

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

  return (
    <>
      <MDBTable style={{ color: "var(--cor-fonte-site)" }}>
        <MDBTableHead>
          <tr>
            <th scope="col" className="p-3">Região</th>
            <th scope="col" className="p-3">Estado</th>
            <th scope="col" className="p-3">Município</th>
            <th scope="col" className="p-3">Mesorregião</th>
            <th scope="col" className="p-3">Microrregião</th>
            <th scope="col" className="p-3">Escola</th>
            <th scope="col" className="p-3">Geral</th>
            <th scope="col" className="p-3">Infantil</th>
            <th scope="col" className="p-3">Fundamental</th>
            <th scope="col" className="p-3">Médio</th>
            <th scope="col" className="p-3">EJA</th>
            <th scope="col" className="p-3">Especial</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {propriedades.map((propriedade, i) => (
            <tr key={i}>
              <td>{propriedade.Regiao}</td>
              <td>{propriedade.NO_UF}</td>
              <td>{propriedade.NO_MUNICIPIO}</td>
              <td>{propriedade.NO_MESORREGIAO}</td>
              <td>{propriedade.NO_MICRORREGIAO}</td>
              <td>{propriedade.NO_ENTIDADE}</td>
              <td>{propriedade.QT_MAT_BAS}</td>
              <td>{propriedade.QT_MAT_INF}</td>
              <td>{propriedade.QT_MAT_FUND}</td>
              <td>{propriedade.QT_MAT_MED}</td>
              <td>{propriedade.QT_MAT_EJA}</td>
              <td>{propriedade.QT_MAT_ESP}</td>
              <td>
                <MDBBtn floating tag="a" onClick={() => handleEdit(propriedade)}>
                  <MDBIcon fas icon="pen" />
                </MDBBtn>
                <MDBBtn floating tag="a" className="mt-2" color="danger" onClick={() => handleDelete(propriedade.id)}>
                  <MDBIcon fas icon="trash-alt" />
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      <Modal show={show} onHide={() => setShow(false)} size="lg" aria-labelledby="modal-edicao">
        <Modal.Header closeButton>
          <Modal.Title>Editar Propriedade</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            Regiao: formData.Regiao || '',
            NO_UF: formData.NO_UF || '',
            NO_MUNICIPIO: formData.NO_MUNICIPIO || '',
            NO_MESORREGIAO: formData.NO_MESORREGIAO || '',
            NO_MICRORREGIAO: formData.NO_MICRORREGIAO || '',
            NO_ENTIDADE: formData.NO_ENTIDADE || '',
            QT_MAT_BAS: formData.QT_MAT_BAS || '',
            QT_MAT_INF: formData.QT_MAT_INF || '',
            QT_MAT_FUND: formData.QT_MAT_FUND || '',
            QT_MAT_MED: formData.QT_MAT_MED || '',
            QT_MAT_EJA: formData.QT_MAT_EJA || '',
            QT_MAT_ESP: formData.QT_MAT_ESP || ''
          }}
          validationSchema={instituicoesSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Região</Form.Label>
                  <Form.Control
                    type="text"
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
                    name="NO_UF"
                    value={values.NO_UF}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.NO_UF && errors.NO_UF}
                  />
                  {touched.NO_UF && errors.NO_UF && <div className="text-danger">{errors.NO_UF}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Município</Form.Label>
                  <Form.Control
                    type="text"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
            <button type="button" className="botao" onClick={() => setShow(false)}>
              Fechar
            </button>
            <button type="submit" className="botao">
              Salvar
            </button>
            </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      <TablePagination
        component="div"
        count={totalPosts}
        page={pagina}
        onPageChange={handleMudancaPagina}
        rowsPerPage={linhasPorPagina}
        onRowsPerPageChange={handleMudancaLinhasPorPagina}
      />
    </>
  );
};

export default PropriedadesTable;
