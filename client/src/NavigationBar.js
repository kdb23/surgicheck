import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './Logout'

function NavigationBar() {
  return (
    <Navbar className='color-nav' variant='light'>
      <Container>
        <Link to='/home' className='navbar-brand'>
          Home
        </Link>
        <Nav className='me-auto'>
          <Link to='/home/admin' className='nav-link'>
            Admin Info
          </Link>
          <Link to='/home/patients' className='nav-link'>
            Patient List
          </Link>
          <Link to='/home/new_patient' className='nav-link'>
            Add New Patient
          </Link>
          <Logout />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;