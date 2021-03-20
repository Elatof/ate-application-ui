import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-dropdown/style.css';
import "./UpdateCustomer.css";

class UpdateCustomer extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            surname: '',
            phone: '',
            email: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    componentDidMount() {
        const Id = this.props.match.params.Id;
        let initialItems = [];
        console.log(Id)
        fetch(`https://ate-api.herokuapp.com/ate-api/customers/${Id}`)
            .then(response => {
                return response.json();
            }).then(data => {
                initialItems = data;
                this.setState(data);
            });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(`https://ate-api.herokuapp.com/ate-api/customers/`, {
            method: "PUT",
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
                window.location.reload();
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        return (
            <div className="updateCustomer">
                <form onSubmit={this.onSubmit}>
                    <b>Обновлення даних по клієнту</b>
                    <p></p>
                        Ім'я:
                <input className="updateCustomer" type="text" id="name" required={true} placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p></p>
                        Прізвище:
                <input className="updateCustomer" type="text" id="surname" required={true} placeholder="Enter surname" name="surname" value={this.state.surname} onChange={this.handleChange} />
                    <p></p>
                        Телефон:
                <input className="updateCustomer" type="tel" id="phone" required={true} placeholder="Enter phone" pattern="^[+][0-9]{12}$" name="phone" value={this.state.phone} onChange={this.handleChange} />
                <p></p>     
                        Приклад формату: +380982561299
                <p></p>
                        Почтова скринька:
                <input className="updateCustomer" type="email" id="email" required={true} placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                <p></p>
                    <button className='myButton'>Підтвердити обновлення</button>
                </form>
            </div>
        );
    }
} export default UpdateCustomer;