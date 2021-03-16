import React from 'react';
import { NotificationManager } from 'react-notifications';
import "./TypeItem.css";

function TypeItem(props) {
    const typeItem = props.item;

    return (
        <tr className= "bottom">
            <td>{typeItem.id} |</td>
            <td>{typeItem.name}</td>
            <td><button className="t" onClick={() => deleteElem(typeItem.id, typeItem.name)}>Видалити</button></td>
        </tr>
    );
}

let deleteElem = (id, name) => {
    let answer = window.confirm("Ви видаляєте тип " + name +
        "\nВидаллення типу може спричинити також видалення відповідного спорядженя та їх замовлення.")

    if (answer) {
        fetch(`http://localhost:5000/ate-api/types/${id}`, {
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

export default TypeItem;
