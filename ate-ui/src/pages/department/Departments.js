import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Department from './Department';


class Departments extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/departments/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Department) => { return Department });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div>
                <Link to="/auth/departments-create">Добавити нове відділення</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Айді</th>
                            <th>Назва</th>
                            <th>Місце знаходження</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(item => <Department item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Departments;