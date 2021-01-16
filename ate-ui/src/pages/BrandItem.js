import { Link } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

function BrandItem(props) {
    const brandItem = props.item;
    let img = null
    if (brandItem.urlImg == null) {
        img = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/notFoundImage_oknt3j.png"
    } else {
        img = brandItem.urlImg
    }

    let deleteElem = (a) => {
        alert(a);
    }
    
    return (
        <tr>
            <td>{brandItem.id} |</td>
            <td>{brandItem.name}</td>
            <td><img src={img} alt="Icon of brand" width="75" height="75"></img></td>
            <button onClick={() => deleteElem(brandItem.id)}>Видалити</button>
        </tr>
    );
}



export default BrandItem;
