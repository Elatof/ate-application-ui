import React, { Component } from 'react';
import BrandItem from './BrandItem';

class Brands extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/brands/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((BrandItem) => { return BrandItem });
                this.setState({ items: initialItems });
            });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(item => <BrandItem item={item} />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Brands;