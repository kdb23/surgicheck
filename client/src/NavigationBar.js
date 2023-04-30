import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg='dark' variant='dark'>
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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;