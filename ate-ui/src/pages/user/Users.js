import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User';

class Users extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/employees/users')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((User) => { return User });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div>
                <Link to="/auth/users-create">Добавити нового консультанта</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => <User item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Users;