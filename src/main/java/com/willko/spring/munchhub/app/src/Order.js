import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Container, Table, ButtonGroup, Input, Label, FormGroup, Form} from 'reactstrap';
import AppNavbar from './AppNavbar';
import NumberFormat from "react-number-format";
import ImageUploader from "react-images-upload";

class Order extends Component {



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

        // await fetch('/api/restaurant/{id}/order', {
        //     method: (item.id) ? 'PUT' : 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item),
        // });
        this.props.history.push('/restaurants');
    }

    render() {
        const {item,menuitem} = this.state;
        // alert(lastSegment);

        const title = <h2>Ordering {menuitem.itemName} from {item.name}!</h2>;
        const groupList = item.menu.map(group => {
            return <tr key={group.id}>
                <td>{group.itemName}</td>
                <td style={{whiteSpace: 'nowrap'}}><NumberFormat value={group.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
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
                        <tr key={menuitem.id}>
                            <td>{menuitem.itemName}</td>
                            <td style={{whiteSpace: 'nowrap'}}><NumberFormat value={menuitem.price} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                        </tr>
                        </tbody>
                    </Table>
                    <h3>Order Info</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name"
                                   onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address"
                                   onChange={this.handleChange} autoComplete="street-address"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text" name="city" id="city"
                                   onChange={this.handleChange} autoComplete="address-level2"/>
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="stateOrProvince">State/Province</Label>
                                <Input type="text" name="stateOrProvince" id="stateOrProvince"
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup className="col-md-5 mb-3">
                                <Label for="country">Country</Label>
                                <Input type="text" name="country" id="country"
                                       onChange={this.handleChange} autoComplete="country"/>
                            </FormGroup>
                            <FormGroup className="col-md-3 mb-3">
                                <Label for="postalCode">Postal Code</Label>
                                <Input type="text" name="postalCode" id="postalCode"
                                       onChange={this.handleChange} autoComplete="postal-code"/>
                            </FormGroup>

                        </div>
                        <h3>Payment Info</h3>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="cc-number">Credit Card Number</Label>
                                <Input type="text" name="cc-number" id="cc-number"
    onChange={this.handleChange} autoComplete="cc-number"/>
                            </FormGroup>
                            <FormGroup className="col-md-5 mb-3">
                                <Label for="cc-name">Cardholder Name</Label>
                                <Input type="text" name="cc-name" id="cc-name"
                                       onChange={this.handleChange} autoComplete="cc-name"/>
                            </FormGroup>
                            <FormGroup className="col-md-1 mb-1">
                                <Label for="cc-csc">CSC</Label>
                                <Input type="text" name="cc-csc" id="cc-csc"
                                       onChange={this.handleChange} autoComplete="cc-csc"/>
                            </FormGroup>
                            <FormGroup className="col-md-1 mb-1">
                                <Label for="cc-exp-month">Exp. Month</Label>
                                <Input type="text" name="cc-exp-month" id="cc-exp-month"
                                       onChange={this.handleChange} autoComplete="cc-exp-month"/>
                            </FormGroup>
                            <FormGroup className="col-md-1 mb-1">
                                <Label for="cc-exp-year">Exp. Year</Label>
                                <Input type="text" name="cc-exp-year" id="cc-exp-year"
                                       onChange={this.handleChange} autoComplete="cc-exp-year"/>
                            </FormGroup>

                        </div>
                        <FormGroup>
                            <Button  color="primary" type="submit" tag={Link} to={"/restaurants/" + item.id+"/order/"+menuitem.id+"/invoice"}>Order</Button>
                            <Button color="secondary" tag={Link} to="/restaurants">Cancel</Button>
                        </FormGroup>

                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(Order);