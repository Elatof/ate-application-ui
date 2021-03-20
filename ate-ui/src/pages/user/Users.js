import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import "./Users.css";

class Users extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('https://ate-api.herokuapp.com/ate-api/employees/users')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((User) => { return User });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className="mainDivUser">
                Список консультантів всіх відділень 
                <Link className="addNewUser" to="/auth/users-create">Добавити нового консультанта</Link>
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