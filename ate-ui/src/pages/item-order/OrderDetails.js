import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

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
        fetch(`http://localhost:5000/ate-api/orders/${Id}`)
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
            fetch(`http://localhost:5000/ate-api/orders/${this.state.id}`, {
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
            <div>
                <b>Детальна інформація про замовлення</b><br />
                <b>Номер оренди: </b>{item.id}<br />
                <b>Дата початку: </b>{startD}<br />
                <b>Дата завершення: </b>{endD}<br />
                <b>Спорядження:</b><br />
                <dd>
                    <img src={item.item.imageUrl} width="150" height="150" />
                    <b>Повне ім'я: </b>{item.item.name}<br />
                    <b>Короткий опис: </b>{item.item.description}<br />
                    <b>Ціна за 1 день: </b>{item.item.price} грн.<br />
                    <b>Тип: </b>{item.item.type.name}<br />
                    <b>Бренд: </b>{item.item.brand.name} <img src={item.item.brand.urlImg} width="75" height="75" /><br />
                    <Link exact to={"/auth/items-details/" + item.item.id}>Детальніше</Link>
                </dd>
                <b>Замовник:</b><br />
                <dd>
                    <b>Ім'я: </b>{item.customer.name}<br />
                    <b>Прізвище: </b>{item.customer.surname}<br />
                    <b>Телефон: </b>{item.customer.phone}<br />
                    <b>Поштова скринька: </b>{item.customer.email}<br />
                </dd>
                <b>Створив консультант:</b><br />
                <dd>
                    <b>Ім'я: </b>{item.employee.firstName}<br />
                    <b>Прізвище: </b>{item.employee.secondName}<br />
                    <b>Телефон: </b>{item.customer.phone}<br />
                    <b>Поштова скринька: </b>{item.customer.email}<br />
                </dd>
                <button onClick={this.deleteElem}>Видалити</button>
                <Link to={"/auth/orders-update/" + item.id}>Обновити</Link>
            </div>
        );
    }
} export default OrderDetails; 