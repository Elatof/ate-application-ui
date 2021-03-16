import React from 'react';
import { NotificationManager } from 'react-notifications';


function Admin(props) {
    const typeItem = props.item;

    return (
        <tr>
            <td>{typeItem.id} |</td>
            <td>{typeItem.firstName}</td>
            <td>{typeItem.secondName}</td>
            <td><button className="delete" onClick={() => deleteElem(typeItem.id)}>Видалити</button></td>
        </tr>
    );
}

let deleteElem = (id) => {
    let answer = window.confirm("Ви видаляєте адміністратора " +
        "\nВи впевненні в свому рішені?")

    if (answer) {
        fetch(`http://localhost:5000/ate-api/employees/${id}`, {
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

export default Admin;
