import { useState, useEffect } from 'react';
import '../App.css';
import {
  MDBCollapse,
  MDBIcon,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    if (isDarkTheme) {
      document.documentElement.style.setProperty('--cor-fundo-site', '#eee6ab');
      document.documentElement.style.setProperty('--cor-borda-footer', '#c5bc8e');
      document.documentElement.style.setProperty('--cor-btn', '#696758');
    } else {
      document.documentElement.style.setProperty('--cor-fundo-site', '#f9f9f9');
      document.documentElement.style.setProperty('--cor-borda-footer', '#ecebeb');
      document.documentElement.style.setProperty('--cor-btn', '#0056b3');
    }
  }, [isDarkTheme]);

  const handleThemeChange = (theme) => {
    setIsDarkTheme(theme === 'dark');
  };

  return (
    <header>
      <Navbar expand="lg" className="Cabecario" style={{ color: "var(--cor-fonte-site)" }}>
        <Container fluid>
          <Navbar.Brand href="/">PCE</Navbar.Brand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href="/">Home</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/instituicoes">Instituições</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/sobre">Sobre</MDBNavbarLink>
              </MDBNavbarItem>
              <NavDropdown className='dropdown' title="Mudar tema" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={() => handleThemeChange('light')}>
                  Claro
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleThemeChange('dark')}>
                  Café
                </NavDropdown.Item>
              </NavDropdown>
            </MDBNavbarNav>
          </MDBCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
