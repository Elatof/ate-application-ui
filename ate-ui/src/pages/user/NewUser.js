import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import "./NewUser.css";

class NewUser extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            secondName: '',
            isAdmin: 1,
            password: '',
            departments: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let initialItems = [];

        fetch('https://ate-api.herokuapp.com/ate-api/departments/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Department) => { return Department });
                this.setState({ departments: initialItems });
            });
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
                NotificationManager.success('Нового консультанта добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        let depatrmentNames = this.state.departments.map((item) => { return item.name });
        let handleDepartment = (e) => {
            let handleItem;
            this.state.departments.forEach((item) => { if (e.value === item.name) handleItem = item; });
            this.setState({ department: handleItem });
        }
        return (
            <div className="newUser">
                Створення нового консультанта
                <form onSubmit={this.onSubmit}>
                    <input className="newUser" type="text" id="firstName" placeholder="Введіть ім'я" name="firstName" required={true} value={this.state.firstName} onChange={this.handleChange} />
                    <p />
                    <input className="newUser" type="text" id="secondName" placeholder="Введіть прізвище" name="secondName" required={true} value={this.state.secondName} onChange={this.handleChange} />
                    <p />
                    <input className="newUser" type="password" id="password" placeholder="Введіть пароль" name="password" required={true} onChange={this.handleChange} />
                    <Dropdown className="dropDown" options={depatrmentNames} onChange={handleDepartment} placeholder="Виберіть відділення" />
                    <button className='myButtonNewUser'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
}
export default NewUser;