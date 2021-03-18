import React from 'react';
import { Link } from 'react-router-dom';
import "./Order.css";

function Order(props) {
    const item = props.item;
    let startD = item.startDate.slice(0, 10);
    let endD = item.endDate.slice(0, 10);
    let closedString;
    if (item.closed) {
        closedString = "https://res.cloudinary.com/elatof/image/upload/v1616095707/ate-project/240px-Yes_Check_Circle.svg_xb2mby.png";
    } else {
        closedString = "https://res.cloudinary.com/elatof/image/upload/v1616096006/ate-project/1_xDGtplbrOnaKC1ov7t23kA_ddhqab.png";
    }
    return (
        <tr className="bottom">
            <td>{item.id}</td>
            <td>{item.item.name}</td>
            <td>{startD}</td>
            <td>{endD}</td>
            <td><img src={closedString} alt="Icon of closed" width="75" height="75"></img></td>
            <td><img src={item.item.imageUrl} alt="Icon of brand" width="75" height="75"></img></td>
            <td><Link className="orderD" to={"orders-details/" + item.id}>Детальніше</Link></td>
        </tr>
    );
} export default Order;
