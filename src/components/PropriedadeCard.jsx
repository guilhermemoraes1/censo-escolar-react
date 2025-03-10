import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PropriedadeCard = ({ imagem, nome, descricao }) => {
  const detalharHandleClick = (event) => {
    console.log('Clicou');
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imagem} />
        <Card.Body className='bodyCard'>
          <Card.Title>{nome}</Card.Title>
          <Card.Text>{descricao}</Card.Text>
          <button className='botao' onClick={detalharHandleClick}>
            Acessar
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
};

PropriedadeCard.propTypes = {
  imagem: PropTypes.string,
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default PropriedadeCard;
