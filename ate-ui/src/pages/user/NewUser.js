import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';

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
        
        fetch(`http://localhost:5000/ate-api/employees/`, {
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
            <form onSubmit={this.onSubmit}>
                <div>
                        Ім'я:
                            <input type="text" id="firstName" placeholder="Enter name" name="firstName" required={true} value={this.state.firstName} onChange={this.handleChange} />
                            <p />
                        Прізвище:
                            <input type="text" id="secondName" placeholder="Enter secondName" name="secondName" required={true} value={this.state.secondName} onChange={this.handleChange} />
                            <p />
                        Пароль:
                            <input type="password" id="password" placeholder="Enter password" name="password" required={true} onChange={this.handleChange} />
                            <p />
                        Відділення: <Dropdown options={depatrmentNames} onChange={handleDepartment} placeholder="Виберіть відділення" />
                </div>
                <button className='addComment'>Підтвердити добавлення</button>
            </form>
        );
    }
}
export default NewAdmin;