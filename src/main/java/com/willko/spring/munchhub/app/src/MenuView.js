import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Table, ButtonGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import NumberFormat from "react-number-format";

class MenuView extends Component {



    emptyItem = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: '',
        cuisineType:'',
        menu:[{
            itemName:'',
            price:0.00,
        }]
    };


    constructor(props) {
        super(props);
        this.state = {item: this.emptyItem};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const group = await (await fetch(`/api/restaurant/${this.props.match.params.id}/menu`)).json();
            this.setState({item: group});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/restaurant/{id}/order', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/restaurants');
    }

    render() {
        const {item} = this.state;
        const title = <h2>Order from {item.name}!</h2>;
        console.log(item);
        const groupList = item.menu.map(group => {
            return <tr key={group.id}>
                <td>{group.itemName}</td>
                <td style={{whiteSpace: 'nowrap'}}><NumberFormat value={group.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" type="submit" tag={Link} to={"/cart"}>Add To Cart</Button>

                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {title}
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="50%">Name</th>
                            <th width="30%">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withRouter(MenuView);