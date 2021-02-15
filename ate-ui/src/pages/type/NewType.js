import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

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
        fetch(`http://localhost:5000/ate-api/types/`, {
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
                NotificationManager.success('Новий бренд добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>
                        Назва типу спорядження:
                            <input type="text" id="name" placeholder="Enter name" name="name" required={true} value={this.state.name} onChange={this.handleChange} />
                    </label>
                </div>
                <button className='addComment'>Підтвердити добавлення</button>
            </form>
        );
    }
}
export default NewType;