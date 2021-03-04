import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';

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
        fetch(`http://localhost:5000/ate-api/customers/${Id}`)
        .then(response => {
            return response.json();
        }).then(data => {
            initialItems = data;
            this.setState(data);
        });
    }

    onSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5000/ate-api/customers/`, {
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
            <form onSubmit={this.onSubmit}>
                <b>Обновлення даних по клієнту</b>
                <div>
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
                <button className='addComment'>Підтвердити обновлення</button>
            </form>
        );
    }
} export default UpdateCustomer;