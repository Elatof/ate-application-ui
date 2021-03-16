import React from 'react';
import { Link } from 'react-router-dom';
import "./Order.css";

function Order(props) {
    const item = props.item;
    let startD = item.startDate.slice(0, 10);
    let endD = item.endDate.slice(0, 10);
    return (
        <tr className="bottom">
            <td>{item.id}</td>
            <td>{item.item.name}</td>
            <td>{startD}</td>
            <td>{endD}</td>
            <td><img src={item.item.imageUrl} alt="Icon of brand" width="75" height="75"></img></td>
            <td><Link className="orderD" to={"orders-details/" + item.id}>Детальніше</Link></td>
        </tr>
    );
} export default Order;
