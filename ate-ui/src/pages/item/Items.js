import React, { Component } from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class Items extends Component {

    constructor() {
        super();
        this.state = {
            stor: true,
            items: []
        };

    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        fetch(`https://ate-api.herokuapp.com/ate-api/items/?all=${this.state.stor}`, {
            headers: {
                "Authorization": "Bearer_" + cookie.get('token')
            }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ items: initialItems });
            });
    }

    render() {
        let inc = 0;
        return (
            <div className="mainDivType">
                Список спорядження яке присутне на складі підприємства
                <Link className="addNewType" to="/auth/items-create">Добавити нове спорядження до складу</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item   => {
                                inc = inc + 1;
                                return <Item item={item} key={item.id} key2={inc} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Items;