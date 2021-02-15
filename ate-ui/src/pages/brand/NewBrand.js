import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

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
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>
                        Назва бренда:
                            <input type="text" id="name" required={true} placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <p></p>
                        Іконка бренду:
                    <input type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                    <p></p>
                </div>
                <button className='addComment'>Підтвердити добавлення</button>
            </form>
        );
    }
}
export default NewBrand;