import React, { Component } from 'react';
import BrandItem from './BrandItem';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import "./Brands.css"

class Brands extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        console.log(new Cookies().get('token'))
        fetch('https://ate-api.herokuapp.com/ate-api/brands/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((BrandItem) => { return BrandItem });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div className = "mainDiv">
                Список всіх брендів які виготовляють туристичне спорядження
                <Link className="addNew" to ="/auth/brands-create">Добавити новий бренд</Link>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => <BrandItem item={item} key={item.id} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Brands;