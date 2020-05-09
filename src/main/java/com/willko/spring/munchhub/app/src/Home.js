import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div >
                <AppNavbar/>
                <header >
                <Container fluid class="container" >
                    <Button color="gray" class="vertical-center"><Link to="/restaurants">Manage Restaurants</Link></Button>
                </Container>
                </header>
            </div>
        );
    }
}

export default Home;