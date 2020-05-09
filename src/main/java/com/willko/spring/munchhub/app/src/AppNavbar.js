import React, { Component } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavDropdown, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar  expand="md" >
            <NavbarBrand tag={Link} to="/"><img
                alt=""
                src="/logo.png"
                width="45"
                height="45"
                className="d-inline-block align-bottom"
            />{' '}
            <b>MunchHub</b>
            </NavbarBrand>
            <NavbarToggler border-color={""}onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>

                    <NavItem>
                        <NavLink
                            href="https://twitter.com/WillkoOfficial" target="_blank">@WillkoOfficial</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/Willkoman/MunchHub" target="_blank">GitHub</NavLink>
                    </NavItem>

                </Nav>
            </Collapse>
        </Navbar>;
    }
}