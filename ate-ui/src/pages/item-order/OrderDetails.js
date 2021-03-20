import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import "./OrderDetails.css";

class OrderDetails extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            startDate: '',
            endDate: '',
            employee: {
                id: '',
                firstName: '',
                secondName: ''
            },
            item: {
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
            },
            customer: {
                id: '',
                name: '',
                surname: '',
                phone: '',
                email: ''
            }
        };

        this.deleteElem = this.deleteElem.bind(this);
    }


    componentDidMount() {
        const Id = this.props.match.params.Id;
        fetch(`https://ate-api.herokuapp.com/ate-api/orders/${Id}`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log(data)
                this.setState(data);
            });
    }



    deleteElem(e) {
        e.preventDefault();
        let answer = window.confirm("Ви видаляєте змовлення " + this.state.id +
            "\nВи вевненні в свому рішені?")
        let res;
        if (answer) {
            fetch(`https://ate-api.herokuapp.com/ate-api/orders/${this.state.id}`, {
                method: 'DELETE',
            }).then(function (response) {
                if (response.status === 500) {
                    NotificationManager.error('Помилка сервера');
                }
                if (response.status === 200) {
                    NotificationManager.success('Успішне видалення');
                }
            });
            this.props.history.push('/auth/orders');
        }
    }



    render() {
        const item = this.state;
        let startD = item.startDate.slice(0, 10);
        let endD = item.endDate.slice(0, 10);
        return (
            <div className="mainDivOrderDetails">
                <b>Детальна інформація про замовлення</b><br />
                <b>Номер оренди: </b>{item.id}<br />
                <b>Дата початку: </b>{startD}<br />
                <b>Дата завершення: </b>{endD}<br />
                <b>Ціна оренди: </b>{item.price} грн.<br />
                <hr></hr>
                <b>Спорядження:</b><br />
                <dd>
                    <img src={item.item.imageUrl} width="150" height="150" /><br />
                    <b>Повне ім'я: </b>{item.item.name}<br />
                    <b>Короткий опис: </b>{item.item.description}<br />
                    <b>Ціна за 1 день: </b>{item.item.price} грн.<br />
                    <b>Тип: </b>{item.item.type.name}<br />
                    <b>Бренд: </b>{item.item.brand.name} <img src={item.item.brand.urlImg} width="75" height="75" /><br />
                    <Link className="details" exact to={"/auth/items-details/" + item.item.id}>Детальніше про спорядження</Link>
                </dd>
                <div className="customerDetails">
                    <b>Замовник:</b><br />
                    <dd>
                        <b>Ім'я: </b>{item.customer.name}<br />
                        <b>Прізвище: </b>{item.customer.surname}<br />
                        <b>Телефон: </b>{item.customer.phone}<br />
                        <b>Поштова скринька: </b>{item.customer.email}<br />
                    </dd>
                </div>
                <div className="emolyeeDetails">
                    <b>Створив консультант:</b><br />
                    <dd>
                        <b>Ім'я: </b>{item.employee.firstName}<br />
                        <b>Прізвище: </b>{item.employee.secondName}<br />
                    </dd>
                </div>
                <button className="deleteOrder" onClick={this.deleteElem}>Видалити</button>
                <Link className="updateOrder" to={"/auth/orders-update/" + item.id}>Обновити</Link>
            </div>
        );
    }
} export default OrderDetails;