import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Order from './Order';
import "./Orders.css";

class Orders extends Component {

    constructor() {
        super();
        this.state = {
            stor: true,
            items: []
        };

    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        fetch(`http://localhost:5000/ate-api/orders/`, {
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className="mainDivOrder">
                Список всіх створених замовлень
                <Link className="addNewOrder" to="/auth/orders-create">Створити замовлення</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Назва</th>
                            <th>Початок</th>
                            <th>Кінець</th>
                            <th>Завершено</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(item => {
                                return <Order item={item} key={item.id} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}export default Orders;