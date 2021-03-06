import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import "./NewOrder.css";

class NewOrder extends Component {
    constructor() {
        super();
        this.state = {
            endDate: '',
            item: {
                id: ''
            },
            customer: {
                id: ''
            },
            items: [],
            customers: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        this.setState({ [target.name]: value });
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/items/?all=false', {
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ items: initialItems });
            });

        fetch('http://localhost:5000/ate-api/customers/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Customer) => { return Customer });
                this.setState({ customers: initialItems });
            });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.item.id === '' || this.state.customer.id === '') {
            NotificationManager.warning("Ви обов'язково маєте вибрати спорядження та клієнта");
            return;
        }
        let cookie = new Cookies();

        console.log(this.state)
        fetch(`http://localhost:5000/ate-api/orders/`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Authorization": "Bearer_" + cookie.get('token'),
                "content-type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                NotificationManager.success('Нове замоалення добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        let itemNames = this.state.items.map((item) => { return item.name });
        let customerNames = this.state.customers.map((customer) => { return customer.name + " " + customer.surname });
        let handleItem = (e) => {
            let handleItem;
            this.state.items.forEach((item) => { if (e.value === item.name) handleItem = item; });
            this.setState({ item: handleItem });
        }
        let handleCustomer = (e) => {
            let handleCustomer;
            this.state.customers.forEach((customer) => { if (e.value === customer.name + " " + customer.surname) handleCustomer = customer; });
            this.setState({ customer: handleCustomer });
        }

        return (
            <div className="newOrder">
                <form onSubmit={this.onSubmit}>
                    <b>Створення нової оренди</b>
                    <p></p>
                    Кінець оренди спорядження:
                        <input className="newOrder" type="date" id="endDate" required={true} placeholder="Enter endDate" name="endDate" onChange={this.handleChange} />
                    <p />
                    <Dropdown className="dropDown" options={itemNames} onChange={handleItem} placeholder="Виберіть спорядження" />
                    <p />
                    <Dropdown className="dropDown" options={customerNames} onChange={handleCustomer} placeholder="Виберіть клієнта" />
                    <p />
                    <button className='myButton'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
} export default NewOrder;