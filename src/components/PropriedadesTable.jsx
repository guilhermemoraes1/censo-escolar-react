import {
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

const PropriedadesTable = ({ propriedades, setPropriedades }) => {
  const [pagina, setPagina] = useState(0); 
  const [linhasPorPagina, setLinhasPorPagina] = useState(10); 
  const [totalPosts, setTotalPosts] = useState(0);

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
      console.log('Deu erro!', error);
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
        alert('Item deletado com sucesso!');
      } else {
        alert('Erro ao deletar item');
      }
    } catch (error) {
      console.log('Erro ao deletar a propriedade:', error);
      alert('Ocorreu um erro');
    }
  };

  return (
    <>
      <MDBTable style={{ color: "var(--cor-fonte-site)" }}>
        <MDBTableHead>
          <tr>
            <th scope="col">Região</th>
            <th scope="col">Estado</th>
            <th scope="col">Município</th>
            <th scope="col">Mesorregião</th>
            <th scope="col">Microrregião</th>
            <th scope="col">Escola</th>
            <th scope="col">Geral</th>
            <th scope="col">Infantil</th>
            <th scope="col">Fundamental</th>
            <th scope="col">Médio</th>
            <th scope="col">EJA</th>
            <th scope="col">Especial</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {propriedades.map((propriedade, i) => {
            return (
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
                  <MDBBtn
                    floating
                    tag="a"
                    className="mx-1"
                    color="danger"
                    onClick={() => handleDelete(propriedade.id)} // Chama a função de deletar
                  >
                    <MDBIcon fas icon="trash-alt" />
                  </MDBBtn>
                </td> 
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>

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
