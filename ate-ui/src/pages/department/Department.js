import React from 'react';
import {Link} from 'react-router-dom';


function Department(props) {
    const item = props.item;

    return (
        <tr className="bottom">
            <td>{item.id} |</td>
            <td>{item.name} |</td>
            <td>{item.address.country}<br/>{item.address.city}<br/>{item.address.street}<br/>{item.address.buildNumber}</td>
        </tr>
    );
}

export default Department;
