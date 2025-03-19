import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { toast } from 'react-toastify';
import { Modal, Form } from 'react-bootstrap';
import '../App.css';
import { usePropriedadesContext } from '../contexts/PropriedadesContext';

const PropriedadesTable = () => {
  const { 
    propriedades, 
    setPropriedades,
    showEdit, 
    handleShowEdit
  } = usePropriedadesContext();

  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editItem, setEditItem] = useState(null); 
  const [formData, setFormData] = useState({});  


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
      toast.error('Deu erro!');
    }
  };

  useEffect(() => {
    getPropriedades();
  }, [pagina, linhasPorPagina]);

  const handleMudancaPagina = (event, novaPagina) => {
    setPagina(novaPagina);
  };

  const handleMudancaLinhasPorPagina = (event) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

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
    handleShowEdit(true); 
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
        handleShowEdit(false);
        setEditItem(null);
      } else {
        toast.error("Erro ao atualizar item");
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
      toast.error("Erro ao editar item");
    }
  };

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

      <Modal show={showEdit} onHide={() => handleShowEdit(false)} size="lg" aria-labelledby="modal-edicao">
        <Modal.Header closeButton>
          <Modal.Title>Editar Escola</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Form.Control
                type="text"
                name="Regiao"
                value={formData.Regiao || ""}
                onChange={(e) => setFormData({ ...formData, Regiao: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="NO_UF"
                value={formData.NO_UF || ""}
                onChange={(e) => setFormData({ ...formData, NO_UF: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Form.Control
                type="text"
                name="NO_MUNICIPIO"
                value={formData.NO_MUNICIPIO || ""}
                onChange={(e) => setFormData({ ...formData, NO_MUNICIPIO: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesorregião</Form.Label>
              <Form.Control
                type="text"
                name="NO_MESORREGIAO"
                value={formData.NO_MESORREGIAO || ""}
                onChange={(e) => setFormData({ ...formData, NO_MESORREGIAO: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Form.Control
                type="text"
                name="NO_MICRORREGIAO"
                value={formData.NO_MICRORREGIAO || ""}
                onChange={(e) => setFormData({ ...formData, NO_MICRORREGIAO: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Escola</Form.Label>
              <Form.Control
                type="text"
                name="NO_ENTIDADE"
                value={formData.NO_ENTIDADE || ""}
                onChange={(e) => setFormData({ ...formData, NO_ENTIDADE: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Geral</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_BAS"
                value={formData.QT_MAT_BAS || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_BAS: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Infantil</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_INF"
                value={formData.QT_MAT_INF || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_INF: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Fundamental</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_FUND"
                value={formData.QT_MAT_FUND || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_FUND: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Ensino Médio</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_MED"
                value={formData.QT_MAT_MED || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_MED: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula EJA</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_EJA"
                value={formData.QT_MAT_EJA || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_EJA: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Especial</Form.Label>
              <Form.Control
                type="number"
                name="QT_MAT_ESP"
                value={formData.QT_MAT_ESP || ""}
                onChange={(e) => setFormData({ ...formData, QT_MAT_ESP: e.target.value })}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="botao" onClick={() => handleShowEdit(false)}>
              Fechar
            </button>
            <button type="submit" className="botao">
              Salvar
            </button>
          </Modal.Footer>
        </Form>
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