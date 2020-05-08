import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends Component {

    constructor(props) {
        super(props);
        this.state = {groups: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/groups')
            .then(response => response.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({groups: updatedGroups});
        });
    }

    render() {
        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        // const groupList = groups.map(group => {
        //     const address = `${group.address || ''}, ${group.city || ''}, ${group.stateOrProvince || ''},${group.postalCode || ''}`;
        //     return <tr key={group.id}>
        //         <td>{group.id}</td>
        //         <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
        //         <td>{address}</td>
        //         <td>{group.cuisineType}</td>
        //         <td>
        //             <ButtonGroup>
        //                 <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
        //                 <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
        //             </ButtonGroup>
        //         </td>
        //     </tr>
        // });

        const groupList = groups.map(group => {
            const address = `${group.address || ''}, ${group.city || ''}, ${group.stateOrProvince || ''},${group.postalCode || ''}`;
            const img = `images/restaurants/${group.id}.jpg`
            return <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <div class="card" key={group.id}>
                <img className="card-img-top photo" src={img} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title text-center">{group.name}</h5>
                        <p className="card-text text-center">Sample Text Sample Text</p>
                        <p className="card-text text-center"><i>{address}</i></p>
                        <p className="card-text text-center"><i>Cuisine Type: <b>{group.cuisineType}</b></i></p>
                        <Button size="md" color="success" className="float-left" >Order Now</Button>
                        <ButtonGroup className="float-right" >
                            <Button size="sm" color="primary" tag={Link} to={"/groups/" + group.id}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                        </ButtonGroup>

                    </div>
                </div>
            </div>

        });

        return (
            <div >
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/groups/new">Add Restaurant</Button>
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

export default GroupList;