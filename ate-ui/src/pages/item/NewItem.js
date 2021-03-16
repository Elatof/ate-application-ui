import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import './NewItem.css';

class NewItem extends Component {
    constructor() {
        super();
        this.state = {
            item: {
                name: '',
                description: '',
                price: '',
                type: {
                    id: '',
                    name: '',
                },
                brand: {
                    id: '',
                    name: '',
                    urlImg: ''
                }
            },
            brands: [],
            types: [],
            image: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'name') {
            this.state.item.name = value;
        } else if (name === 'description') {
            this.state.item.description = value;
        } else if (name === 'price') {
            this.state.item.price = value;
        }
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/types/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Type) => { return Type });
                this.setState({ types: initialItems });
            });

        fetch('http://localhost:5000/ate-api/brands/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Brand) => { return Brand });
                this.setState({ brands: initialItems });
            });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.item.brand.id === '' || this.state.item.type.id === '') {
            NotificationManager.warning("Ви обов'язково маєте вибрати бренд та тип");
            return;
        }

        let form_data = new FormData();
        let cookie = new Cookies();
        form_data.append('file', this.state.image, this.state.image.name);

        fetch(`http://localhost:5000/ate-api/items/?name=${this.state.item.name}&description=${this.state.item.description}&price=${this.state.item.price}&type.id=${this.state.item.type.id}&brand.id=${this.state.item.brand.id}`, {
            method: "POST",
            body: form_data,
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                NotificationManager.success('Нове спорядження добавленно');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        let typeNames = this.state.types.map((type) => { return type.name });
        let brandNames = this.state.brands.map((brand) => { return brand.name });
        let handleType = (e) => {
            let handleType;
            this.state.types.forEach((type) => { if (e.value === type.name) handleType = type; });
            this.state.item.type = handleType;
        }
        let handleBrand = (e) => {
            let handleBrand;
            this.state.brands.forEach((brand) => { if (e.value === brand.name) handleBrand = brand; });
            this.state.item.brand = handleBrand;
        }

        return (
            <div className="newItem">
                <form onSubmit={this.onSubmit}>
                    <b>Створення нового спорядження на скаді</b>
                    <p />
                    <input className="newItem" type="text" id="name" required={true} placeholder="Введіть назву" name="name" onChange={this.handleChange} />
                    <p />
                    <input className="newItem" type="text" id="description" required={true} placeholder="Введіть короткий опис" name="description" onChange={this.handleChange} />
                    <p />
                    <input className="newItem" type="number" id="price" required={true} placeholder="Введіть ціну" name="price" onChange={this.handleChange} />
                    <p />
                    <Dropdown className="dropDown" options={typeNames} onChange={handleType} placeholder="Виберіть тип" />
                    <p />
                    <Dropdown className="dropDown" options={brandNames} onChange={handleBrand} placeholder="Виберіть бренд" />
                    <p />
                    Зображення спорядження:
                    <input className="newItem" type="file" id="image" required={true} accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                    <p />
                    <button className='myButton'>Підтвердити добавлення</button>
                </form>
            </div>
        );
    }
} export default NewItem;