import React from 'react';
import { NotificationManager } from 'react-notifications';


function User(props) {
    const typeItem = props.item;

    return (
        <tr className="bottom">
            <td>{typeItem.id} |</td>
            <td>{typeItem.firstName}</td>
            <td>{typeItem.secondName}</td>
            <td>{typeItem.department.name}</td>
            <td><button className="t" onClick={() => deleteElem(typeItem.id)}>Видалити</button></td>
        </tr>
    );
}

let deleteElem = (id) => {
    let answer = window.confirm("Ви видаляєте консультанта " +
        "\nВидаллення консультанта може спричинити також видалення відповідного замовлення.")

    if (answer) {
        fetch(`https://ate-api.herokuapp.com/ate-api/employees/${id}`, {
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

export default User;
