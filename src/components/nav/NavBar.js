import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';


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
              <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">CosBuddy</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/conventions">Conventions</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink tag={Link} to="/costumes">Costumes</NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink href="/friends">Friends</NavLink>
                    </NavItem> */}
                    <NavItem>
                        <NavLink onClick={this.clearSession} tag={Link} to="/">Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
      }
