import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Container, Table, ButtonGroup, Input, Label, FormGroup, Form} from 'reactstrap';
import AppNavbar from './AppNavbar';
import NumberFormat from "react-number-format";
import ImageUploader from "react-images-upload";

class Invoice extends Component {



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

    emptyMenuItem={
        itemName:'',
        price:0.00
    }

    constructor(props) {
        super(props);
        this.state = {item: this.emptyItem, menuitem:this.emptyMenuItem};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const parts = window.location.href.split('/');
        parts.pop();
        const lastSegment = parts.pop() || parts.pop();
        parts.pop();
        const restId= parts.pop();
        if (this.props.match.params.id !== 'new') {
            const menugroup = await (await fetch(`/api/restaurant/${this.props.match.params.id}/order/${parseInt(lastSegment)}`)).json();
            const group = await (await fetch(`/api/restaurant/${restId}/menu/`)).json();
            this.setState({item: group,menuitem:menugroup});

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
        const {item,menuitem} = this.state;
        // alert(lastSegment);

        const title = <h2>Thank you for ordering the {menuitem.itemName} from {item.name}!</h2>;
        const groupList = item.menu.map(group => {
            return <tr key={group.id}>
                <td>{group.itemName}</td>
                <td style={{whiteSpace: 'nowrap'}}><NumberFormat value={group.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" type="submit" tag={Link} to={"/restaurants/" + group.id+"/order/"}>Add To Cart</Button>

                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {title}
                    <h4>Have a wonderful day!</h4>
                    <br/>
                    <br/>
                    <h3>Order Info</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="50%">Ordered</th>
                            <th width="30%">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr key={menuitem.id}>
                            <td>{menuitem.itemName}</td>
                            <td style={{whiteSpace: 'nowrap'}}><NumberFormat value={menuitem.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                        </tr>
                        </tbody>
                    </Table>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Button color="secondary" tag={Link} to="/home">Back To Restaurants</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(Invoice);