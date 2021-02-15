import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            secondName: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let status;
        fetch(`http://localhost:5000/ate-api/authentication/login`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                status = 200;
                NotificationManager.success('Аутентифікація успішна');
                return response.text();
            }
        }).then(data => {
            if (status === 200) {
                const cookies = new Cookies();
                cookies.set('token', data, { path: '/', maxAge: 3600 });
                this.props.history.push('/auth');
            }
        });
    }


    render() {
        const cookies = new Cookies();
        cookies.remove('token');

        return (
            <div className="signin">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input className="signin" type="text" id="name" required={true} placeholder="Enter your name" name="firstName" onChange={this.handleChange} />
                    </div>

                    <div>
                        <input className="signin" type="text" id="surname" required={true} placeholder="Enter your surname" name="secondName" onChange={this.handleChange} />
                    </div>

                    <div>
                        <input className="signin" type="password" id="password" required={true} placeholder="Enter your password" name="password" onChange={this.handleChange} />
                    </div>

                    <div>
                        <button className="myButton">Sign in</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default SignInForm;