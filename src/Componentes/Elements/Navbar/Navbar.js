import React from 'react';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite';
import './Navbar.css';
import 'rsuite/dist/styles/rsuite-default.css'
import 'rsuite/dist/styles/rsuite-default.min.css'
import 'rsuite/dist/styles/rsuite-default.min.css.map'

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
    return (
      <Navbar {...props} style={{background:'rgba(255, 255, 255)'}}>
        <Navbar.Header>
          <a href="/Home" className="navbar-brand logo">
            ResCity
          </a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav onSelect={onSelect} activeKey={activeKey}>
            <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              Home
            </Nav.Item>
            <Nav.Item eventKey="2">News</Nav.Item>
            <Nav.Item eventKey="3">Products</Nav.Item>
            <Dropdown title="About">
              <Dropdown.Item eventKey="4">Company</Dropdown.Item>
              <Dropdown.Item eventKey="5">Team</Dropdown.Item>
              <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
            </Dropdown>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
};

export default NavBarInstance;
