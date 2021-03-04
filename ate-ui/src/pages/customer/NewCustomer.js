import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

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
        this.setState({ [target.name] : value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        fetch(`http://localhost:5000/ate-api/customers/`, {
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
            <form onSubmit={this.onSubmit}>
                <div>
                    Створення нового клієнта.
                    <p></p>
                        Ім'я:
                            <input type="text" id="name" required={true} placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p></p>
                        Прізвище:
                            <input type="text" id="surname" required={true} placeholder="Enter surname" name="surname" value={this.state.surname} onChange={this.handleChange} />
                    <p></p>
                        Телефон:
                            <input type="tel" id="phone" required={true} placeholder="Enter phone" pattern="^[+][0-9]{12}$" name="phone" value={this.state.phone} onChange={this.handleChange} />
                        Приклад формату: +380982561299
                    <p></p>
                        Почтова скринька:
                            <input type="email" id="email" required={true} placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <button>Підтвердити добавлення</button>
            </form>
        );
    }
}
export default NewCustomer;