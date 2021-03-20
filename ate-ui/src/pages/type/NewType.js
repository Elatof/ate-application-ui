import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import "./NewType.css"

class NewType extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        this.setState({ name: value });
    }

    onSubmit(e) {
        e.preventDefault();
        fetch(`https://ate-api.herokuapp.com/ate-api/types/`, {
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
                NotificationManager.success('Новий тип добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        return (
            <div className="newType">
                Добавлення нового типу
                <form className="newType" onSubmit={this.onSubmit}>
                    <input className="newType" type="text" id="name" placeholder="Введіть наву нового типу" name="name" required={true} value={this.state.name} onChange={this.handleChange} />
                    <p></p>
                    <button className="newType" className='myButton'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
}
export default NewType;