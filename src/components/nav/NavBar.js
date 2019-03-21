import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import auth0Client from "../../Auth";
import { AUTH_CONFIG } from  '../../Auth0Variables';

    export default class NavBar extends React.Component {
        state = {
            isOpen: false
        }

        toggle = () => {
          this.setState({
            isOpen: !this.state.isOpen
          });
        }

        signOut = () => {
          auth0Client.signOut();
          window.location.replace(`https://megcruzen.auth0.com/v2/logout?returnTo=http://localhost:3000&client_id=${AUTH_CONFIG.clientId}`);
        }

        render() {
          return (
            <div id="nav">
              <Navbar light expand="md">
                <NavbarBrand tag={Link} to="/"><span className="nav-highlight">con</span>panion</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/conventions">Conventions</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/costumes">Costumes</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/groups">Groups</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => {this.signOut()}} style={{cursor:'pointer'}}>Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
      }
