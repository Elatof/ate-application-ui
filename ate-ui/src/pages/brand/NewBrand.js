import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import './NewBrand.css'

class NewBrand extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        this.setState({ name: value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('file', this.state.image, this.state.image.name);
        fetch(`http://localhost:5000/ate-api/brands/?brandDto=${this.state.name}`, {
            method: "POST",
            body: form_data
        }).then(function (response) {
            if (response.status == 500) {
                NotificationManager.error('Помилка сервера');
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
            <div className="newBrand">
                Добавлення нового бренду
                <form className= "newBrand" onSubmit={this.onSubmit}>
                    <input className= "newBrand" type="text" id="name" required={true} placeholder="Введіть ім'я" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p></p>
                    <input className= "newBrand" type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                    <p></p>
                    <button className='myButton'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
}
export default NewBrand;