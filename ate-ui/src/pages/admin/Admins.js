import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Admin from './Admin';

class Admins extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/employees/admins')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Admin) => { return Admin });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div>
                <Link to="/auth/admins-create">Добавити нового консультанта</Link>
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