import { Container } from 'react-bootstrap';
import PropriedadesCard from './PropriedadesCard';
import '../App.css';

const Main = () => {
  return (
    <main >
      <Container className="mt-2">
        {/* Propriedades */}
        <h1 style={{margin: '3rem', textAlign: 'center'}}>Notícias</h1>
        <PropriedadesCard />
      </Container>
    </main>
  );
};

export default Main;
