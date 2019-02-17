import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

    export default class NavBar extends React.Component {
        constructor(props) {
          super(props);

          this.toggle = this.toggle.bind(this);
          this.state = {
            isOpen: false
          };
        }
        toggle() {
          this.setState({
            isOpen: !this.state.isOpen
          });
        }
        clearSession = () => {
            sessionStorage.clear();
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
                        <NavLink onClick={this.clearSession} tag={Link} to="/login">Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
      }
