import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import "./Admins.css";

class Admins extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('https://ate-api.herokuapp.com/ate-api/employees/admins')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Admin) => { return Admin });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className="mainDivAdmin">
                Список всіх адміністраторів
                <Link className="addNewAdmin" to="/auth/admins-create">Добавити нового адміністратора</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => <Admin item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Admins;