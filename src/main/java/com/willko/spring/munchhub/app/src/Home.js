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

                </header>
                <Container fluid class="container d-flex" >
                    <div className="d-flex justify-content-center text-center"><Button color="gray" class="vertical-center text-center"><Link to="/restaurants">Manage Restaurants</Link></Button></div>
                    <div className="d-flex justify-content-center text-center"><Button color="gray" class="vertical-center text-center"><Link to="/home">Browse Restaurants</Link></Button></div>
                </Container >
            </div>
        );
    }
}

export default Home;