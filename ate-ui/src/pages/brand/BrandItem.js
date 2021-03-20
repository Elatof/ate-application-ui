import React from 'react';
import {NotificationManager} from 'react-notifications';
import './BrandItem.css';


function BrandItem(props) {
    const brandItem = props.item;
    let img = null
    if (brandItem.urlImg == null) {
        img = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/notFoundImage_oknt3j.png"
    } else {
        img = brandItem.urlImg
    }

    return (
        <tr className= "bottom">
            <td>{brandItem.id} |</td>
            <td>{brandItem.name}</td>
            <td><img src={img} alt="Icon of brand" width="75" height="75"></img></td>
            <td><button className="t" onClick={() => deleteElem(brandItem.id, brandItem.name)}>Видалити</button></td>
        </tr>
    );
}

let deleteElem = (id, name) => {
    let answer = window.confirm("Ви видаляєте бренд " + name +
        "\nВидаллення бренду може спричинити також видалення відповідного спорядженя та їх замовлення.")

    if (answer) {
        fetch(`https://ate-api.herokuapp.com/ate-api/brands/${id}`, {
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

export default BrandItem;
