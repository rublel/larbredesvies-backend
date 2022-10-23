/*
  this is the header component
  it includes the logo, and the navbar
  the redirection are handled by react-router-dom
*/

import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../asets/logo.png";
const Header = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <></>
      ) : (
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand as={NavLink} to="/home">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              L'Arbre des vies
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  as={NavLink}
                  to="/catalogue"
                  {...(location.pathname === "/catalogue" && { active: true })}
                >
                  Catalogue
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/care"
                  {...(location.pathname === "/care" && { active: true })}
                >
                  clients
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/orders"
                  {...(location.pathname === "/orders" && { active: true })}
                >
                  Commandes
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/message"
                  {...(location.pathname === "/message" && { active: true })}
                >
                  Message
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
