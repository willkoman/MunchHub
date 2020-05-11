import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupListUser extends Component {

    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true};
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/restaurants')
            .then(response => response.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }


    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = groups.map(group => {
            const address = `${group.address || ''}, ${group.city || ''}, ${group.stateOrProvince || ''},${group.postalCode || ''}`;
            const img = `images/restaurants/${group.id}.jpg`
            return <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <div class="card" key={group.id}>
                    <img className="card-img-top photo" src={img} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title text-center">{group.name}</h5>
                        <p className="card-text text-center"><i>{address}</i></p>
                        <p className="card-text text-center"><i>Cuisine Type: <b>{group.cuisineType}</b></i></p>
                        <Button size="md" color="success" className="float-left" tag={Link} to={"/restaurants/" + group.id+"/menu/"} >Order Now</Button>

                    </div>
                </div>
            </div>

        });

        return (
            <div >
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                    </div>
                    <h3>Restaurants</h3>

                    <div className="card-deck justify-content-center">
                        {groupList}
                    </div>



                </Container>
            </div>
        );
    }
}

export default GroupListUser;