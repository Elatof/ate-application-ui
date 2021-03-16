import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import "./UpdateItem.css";

class UpdateItem extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
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
            },
            imageUrl: null,
            brands: [],
            types: [],
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
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    componentDidMount() {
        let cookie = new Cookies();
        const Id = this.props.match.params.Id;
        let initialItems = [];
        fetch(`http://localhost:5000/ate-api/items/${Id}`, {
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            initialItems = data;
            this.setState(data);
        });

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

        let form_data = new FormData();
        let cookie = new Cookies();
        if (this.state.image) {
            form_data.append('file', this.state.image, this.state.image.name);
        }

        fetch(`http://localhost:5000/ate-api/items/?id=${this.state.id}&name=${this.state.name}&description=${this.state.description}&price=${this.state.price}&type.id=${this.state.type.id}&brand.id=${this.state.brand.id}`, {
            method: "PUT",
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
                window.location.reload();
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
            this.state.type = handleType;
        }
        let handleBrand = (e) => {
            let handleBrand;
            this.state.brands.forEach((brand) => { if (e.value === brand.name) handleBrand = brand; });
            this.state.brand = handleBrand;
        }
        return (
            <div className="updateItem">
                <form onSubmit={this.onSubmit}>
                    <b>Обновлення спорядження на скаді</b>
                    <p />
                    Назва:
                        <input className="updateItem" type="text" id="name" required={true} placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <p />
                    Короткий опис:
                        <input className="updateItem" type="text" id="description" required={true} placeholder="Enter description" name="description" value={this.state.description} onChange={this.handleChange} />
                    <p />
                    Ціна орендя за день (грн.):
                        <input className="updateItem" type="number" id="price" required={true} placeholder="Enter price" name="price" value={this.state.price} onChange={this.handleChange} />
                    <p />
                    Тип: <Dropdown className="dropDown" options={typeNames} value={this.state.type.name} onChange={handleType} placeholder="Виберіть тип" />
                    <p />
                    Бренд: <Dropdown className="dropDown" options={brandNames} value={this.state.brand.name} onChange={handleBrand} placeholder="Виберіть бренд" />
                    <p />
                    Зображення спорядження:
                    <img src={this.state.imageUrl} width="200" height="200" />
                    <input className="updateItem" type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                    <p />
                    <button className="myButton">Підтвердити обновлення</button>
                </form>
            </div>
        );
    }
} export default UpdateItem;