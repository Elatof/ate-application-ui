import React from 'react';
import {Link} from 'react-router-dom';
import "./Item.css"

function Item(props) {
    const item = props.item;
    let storImg;
    let storText;
    if(item.free){
        storText = "Наявне на складі";
        storImg = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/inStorage_q4locf.png";
    } else {
        storText = "Не наявне на складі";
        storImg = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/noneStorage_ww43se.png";
    }

    let defoultImg = "https://res.cloudinary.com/elatof/image/upload/v1610811136/ate-project/notFoundImage_oknt3j.png";
    if (item.imageUrl === null) {
        item.imageUrl = defoultImg;
    }
    if (item.brand.urlImg === null) {
        item.brand.urlImg = defoultImg;
    }

    return (
        <tr className= "bottom">
            <td>{props.key2} |</td>
            <td><img src={item.imageUrl} alt="Icon of item" width="75" height="75"></img></td>
            <td><div className="des">{item.name}<br/>{item.type.name}</div></td>
            <td><img src={item.brand.urlImg} alt="Icon of brand" width="75" height="75"></img></td>
            <td>{storText}<br/><dd><img src={storImg} alt="Icon of stor" width="45" height="45"></img></dd></td>
            <td><Link className="details" to={"items-details/" + item.id}>Детальніше</Link></td>
        </tr>
    );
}

export default Item;
