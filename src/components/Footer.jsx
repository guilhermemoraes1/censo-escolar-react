import {
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBRow,
} from 'mdb-react-ui-kit';
import '../App.css';

const Footer = () => {
  return (
      <MDBFooter
        className="text-center text-lg-start"
      >
        <section >
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow>
            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="fw-bold mb-4">Ajuda</h6>
                <p>
                  Politicas de Privacidade
                </p>
                <p>
                  Termos De Uso
                </p>
                <p>
                  Perguntas Frequentes
                </p>
                <p>
                  Contatos
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="fw-bold mb-4">
                  Suporte
                </h6>
                <p>
                  Guarabira, Paraíba, Brasil.
                </p>
                <p>
                  exclusive@gmail.com
                </p>
                <p>
                  83 91234-5678
                </p>
              </MDBCol>

            </MDBRow>
          </MDBContainer>
        </section>

        <div

          className="copyright text-center p-4"
        >
          © 2025 Copyright <strong>ParaibaCensoEscolar.com</strong>
        </div>
      </MDBFooter>
  );
};

export default Footer;
