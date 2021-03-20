import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import "./NewAdmin.css";

class NewAdmin extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            secondName: '',
            isAdmin: 2,
            password: ''
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

        fetch(`https://ate-api.herokuapp.com/ate-api/employees/`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            if (response.status == 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status == 200) {
                NotificationManager.success('Нового адміністратора добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {

        return (
            <div className="newAdmin">
                Створення нового адміністратора
                <form onSubmit={this.onSubmit}>
                    <input className="newAdmin" type="text" id="firstName" placeholder="Введіть ім'я" name="firstName" required={true} value={this.state.firstName} onChange={this.handleChange} />
                    <p />
                    <input className="newAdmin" type="text" id="secondName" placeholder="Введіть прізвище" name="secondName" required={true} value={this.state.secondName} onChange={this.handleChange} />
                    <p />
                    <input className="newAdmin" type="password" id="password" placeholder="Введіть пароль" name="password" required={true} onChange={this.handleChange} />
                    <p />
                    <button className='myButton'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
}
export default NewAdmin;