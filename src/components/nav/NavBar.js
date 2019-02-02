import React from "react"
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
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">CosBuddy</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/conventions">Conventions</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/costumes">Costumes</NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink href="/friends">Friends</NavLink>
                    </NavItem> */}
                    <NavItem>
                      <NavLink onClick={this.clearSession} href="/">Logout</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }
      }
