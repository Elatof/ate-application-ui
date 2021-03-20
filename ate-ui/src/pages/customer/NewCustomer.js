import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import "./NewCustomer.css";

class NewCustomer extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            phone: '',
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        this.setState({ [target.name]: value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        fetch(`https://ate-api.herokuapp.com/ate-api/customers/`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
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
                NotificationManager.success('Клієнт успішно добавленний');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        return (
            <div className="newCustomer">
                <form onSubmit={this.onSubmit}>
                    Створення нового клієнта.
                    <p></p>
                    <input className="newCustomer" type="text" id="name" required={true} placeholder="Введіть ім'я" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p></p>
                    <input className="newCustomer" type="text" id="surname" required={true} placeholder="Введіть прізвище" name="surname" value={this.state.surname} onChange={this.handleChange} />
                    <p></p>
                    <input className="newCustomer" type="tel" id="phone" required={true} placeholder="Введіть мобільний телефон" pattern="^[+][0-9]{12}$" name="phone" value={this.state.phone} onChange={this.handleChange} />
                    <p></p>
                    Приклад формату: +380982561299
                    <p></p>
                    <input className="newCustomer" type="email" id="email" required={true} placeholder="Введіть почтову скриньку" name="email" value={this.state.email} onChange={this.handleChange} />
                    <p></p>
                    <button className="myButton">Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
}
export default NewCustomer;