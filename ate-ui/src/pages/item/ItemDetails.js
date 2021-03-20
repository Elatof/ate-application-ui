import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import "./ItemDetails.css"

class ItemDetails extends Component {

    constructor() {
        super();
        this.state = {
            Item: {
                id: '',
                name: '',
                description: '',
                price: '',
                type: {
                    id: '',
                    name: ''
                },
                brand: {
                    id: '',
                    name: '',
                    urlImg: ''
                },
                imageUrl: ''
            }
        };

        this.deleteElem = this.deleteElem.bind(this);
    }


    componentDidMount() {
        let cookie = new Cookies();
        const Id = this.props.match.params.Id;
        let initialItems = [];
        fetch(`https://ate-api.herokuapp.com/ate-api/items/${Id}`, {
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            initialItems = data;
            this.setState({
                Item: initialItems,
            });
        });
    }



    deleteElem(e) {
        e.preventDefault();
        let answer = window.confirm("Ви видаляєте спорядження " + this.state.Item.name +
            "\nВидаллення спорядження може спричинити також видалення відповідного замовлення.")
        let res;
        if (answer) {
            fetch(`https://ate-api.herokuapp.com/ate-api/items/${this.state.Item.id}`, {
                method: 'DELETE',
            }).then(function (response) {
                if (response.status === 500) {
                    NotificationManager.error('Помилка сервера');
                }
                if (response.status === 200) {
                    NotificationManager.success('Успішне видалення');
                }
            });
            this.props.history.push('/auth/items');
        }
    }



    render() {
        let storImg;
        let storText;
        if (this.state.Item.free) {
            storText = "Так";
            storImg = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/inStorage_q4locf.png";
        } else {
            storText = "Ні";
            storImg = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/noneStorage_ww43se.png";
        }

        return (
            <div className = "mainDivDetailsItem">
                <b>Детальна інформація про спорядження</b><br />
                <img className="mainImgItem" src={this.state.Item.imageUrl} width="400" height="400" /><br />
                <b>Унікальне айді спорядження в БД: </b>{this.state.Item.id}<br />
                <b>Повне ім'я: </b>{this.state.Item.name}<br />
                <b>Короткий опис: </b>{this.state.Item.description}<br />
                <b>Загальна ціна: </b>{this.state.Item.commonPrice}<br />
                <b>Стан: </b>{this.state.Item.state}<br />
                <b>Ціна:</b><br />
                <dd>За 1 день: {this.state.Item.price} грн.</dd>
                <dd>За 3 дня: {this.state.Item.price * 3} грн.</dd>
                <dd>За 7 днів: {this.state.Item.price * 7} грн.</dd>
                <b>Тип: </b>{this.state.Item.type.name}<br />
                <b>Бренд: </b>{this.state.Item.brand.name} <img src={this.state.Item.brand.urlImg} width="75" height="75" /><br />
                <b>Наявність на складі: </b>{storText}  <img src={storImg} width="20" height="20" /><br />
                <button className="delete" onClick={this.deleteElem}>Видалити</button>
                <Link className="update" to={"/auth/items-update/" + this.state.Item.id}>Обновити</Link>
            </div>
        );
    }
} export default ItemDetails; 