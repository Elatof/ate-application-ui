import React, { Component } from 'react';
import TypeItem from './TypeItem';
import { Link } from 'react-router-dom';
import './Types.css';

class Types extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/types/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((TypeItem) => { return TypeItem });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className = "mainDivType">
                <Link className = "addNewType" to="/auth/types-create">Добавити новий тип спорядження</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => <TypeItem item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Types;