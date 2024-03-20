
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import NedLogo from '../../assets/nedlogo.png';

function Header() {
  return (
    <>
      <Navbar expand="lg" className="navbar-top-section">
        <Container>
          <Navbar.Brand to="/home">
            <img src={NedLogo} className='nedlogo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} className={({ isActive }) => `${isActive ? 'active' : ""}`} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} className={({ isActive }) => `${isActive ? 'active' : ""}`}  to="/donate">Donate</Nav.Link>
              <Nav.Link as={NavLink} className={({ isActive }) => `${isActive ? 'active' : ""}`}  to="/donors">Donors</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;
