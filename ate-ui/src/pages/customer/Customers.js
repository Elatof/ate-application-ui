import React, { Component } from 'react';
import CustomerItem from './CustomerItem';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./Customers.css";

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
        fetch('https://ate-api.herokuapp.com/ate-api/customers/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((CustomerItem) => { return CustomerItem });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className="mainDivCustomer">
                Список всіх клієнтів
                <Link className="addNewCustomer" to="/auth/customers-create">Добавити нового клієнта</Link>
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