import React, { Component } from 'react';
import CustomerItem from './CustomerItem';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Customers extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        console.log(new Cookies().get('token'))
        fetch('http://localhost:5000/ate-api/customers/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((CustomerItem) => { return CustomerItem });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div>
                <Link to ="/auth/customers-create">Добавити нового клієнта</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => <CustomerItem item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Customers;