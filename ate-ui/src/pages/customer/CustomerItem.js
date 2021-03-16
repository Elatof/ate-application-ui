import React from 'react';
import {NotificationManager} from 'react-notifications';
import { Link } from 'react-router-dom';
import "./CustomerItem.css";

function CustomerItem(props) {
    const customerItem = props.item;

    return (
        <tr className= "bottom">
            <td>{customerItem.id} |</td>
            <td>{customerItem.name}</td>
            <td>{customerItem.surname}</td>
            <td>{customerItem.phone}</td>
            <td>{customerItem.email}</td>
            <td><button className="deleteCustomer" onClick={() => deleteElem(customerItem.id)}>Видалити</button></td>
            <td><Link className="updateLink" to ={"/auth/customers-update/" + customerItem.id}>Змінити</Link></td>
        </tr>
    );
}

let deleteElem = (id) => {
    let answer = window.confirm("Ви видаляєте клієнта " +
        "\nВидаллення клієнта може спричинити також видалення відповідного замовлення.")

    if (answer) {
        fetch(`http://localhost:5000/ate-api/customers/${id}`, {
            method: 'DELETE',
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch(function (error) {
            NotificationManager.error('Помилка сервера');
        });
    }
}

export default CustomerItem;
