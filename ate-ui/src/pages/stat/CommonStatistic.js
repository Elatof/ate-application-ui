import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { PieChart } from 'react-minimal-pie-chart';
import './CommonStatistic.css';
import Dropdown from 'react-dropdown';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import ReactToPdf from 'react-to-pdf'

class Statistic extends Component {

    constructor() {
        super();
        this.state = {
            startDate: new Date('2019-7-1'),
            endDate: new Date(),

            numberOfOrders: '',
            departmentsNumber: [],
            employeeNumber: [],
            typeItemNumber: [],
            commonProfit: '',
            departmentsProfit: [],
            employeeProfit: [],
            typeItemProfit: [],
            dateOrders: [],
            dateProfit: [],

            departments: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e)
        let target = e.target;
        let value = target.value;
        this.setState({ [target.name]: value });
        this.componentDidMount()
    }

    reloud = async () => {
        this.forceUpdate()
    }

    componentDidMount() {
        let initialItems = [];
        fetch('http://localhost:5000/ate-api/departments/')
            .then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Department) => { return Department });
                this.setState({ departments: initialItems });
            });

        fetch(`http://localhost:5000/ate-api/statistic/`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 200) {
                NotificationManager.success('Статистика обрахована успішно');
            }
            return response.json();
        }).then(data => {
            this.setState(data, this.reloud)
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }


    render() {
        console.log(this.state)
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        function convertMap(paramMap) {
            console.log(paramMap)
            let listKey = Object.keys(paramMap);
            let listAnswers = [];
            listKey.map(item => {
                listAnswers.push({ title: item, value: paramMap[item], color: getRandomColor() });
            })
            console.log(listAnswers)
            return listAnswers;
        }

        function convertMap2(paramMap) {
            console.log(paramMap)
            let listKey = Object.keys(paramMap);
            let listAnswers = [];
            listKey.map(item => {
                let itemN = item.slice(0, 10);
                listAnswers.push({ name: itemN, uv: paramMap[item], });
            })
            console.log(listAnswers)
            return listAnswers;
        }
        const defaultLabelStyle = {
            fontSize: '8px',
            fontFamily: 'sans-serif',
            fill: 'white'
        };

        let depatrmentNames = this.state.departments.map((item) => { return item.name });
        let handleDepartment = (e) => {
            let handleItem;
            this.state.departments.forEach((item) => { if (e.value === item.name) handleItem = item; });
            this.setState({ departmentDto: handleItem });
            this.componentDidMount();
        }
        const downloadFile = async () => {
            const fileName = "statistic";
            const json = JSON.stringify(this.state);
            const blob = new Blob([json],{type:'application/json'});
            const href = await URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = fileName + ".json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

        return (
            <div className="test">
                <button className="myButton" onClick={() => window.print()}>Маніпуляції з PDF форматом</button>
                <button className="myButton" onClick={() => downloadFile()}>Статистика в json форматі</button>
                <h1>Збір загальної статистики</h1>
                <div className="inputStatDiv">
                    Від:
                        <input className="change" type="date" id="startDate" required={true} placeholder="Enter startDate" name="startDate" onChange={this.handleChange} />
                    До:
                        <input className="change" type="date" id="endDate" required={true} placeholder="Enter endDate" name="endDate" onChange={this.handleChange} />
                    <p />
                    <Dropdown className="dropDown" options={depatrmentNames} onChange={handleDepartment} placeholder="Виберіть відділення" />
                    <hr></hr>
                    <b>Загальна кількість замовлень: {this.state.numberOfOrders} </b>
                    <p></p>
                    <b>Загальний прибуток: {this.state.commonProfit}</b>
                </div>
                <div className="departmentsNumberBorder">
                    <div className="borderText">Кількість замовлень для кожного відділення </div>
                    <PieChart
                        data={convertMap(this.state.departmentsNumber)}
                        label={({ dataEntry }) => dataEntry.title + '(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="departmentsProfitBorder">
                    <div className="borderText">Відношення доходу кожного відділення</div>
                    <PieChart
                        data={convertMap(this.state.departmentsProfit)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="employeeNumberBorder">
                    <div className="borderText">Кількість замовлень для кожного працівника</div>
                    <PieChart
                        data={convertMap(this.state.employeeNumber)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="employeeProfitBorder">
                    <div className="borderText">Відношення доходу для кожного працівника</div>
                    <PieChart
                        data={convertMap(this.state.employeeProfit)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="typeItemNumberBorder">
                    <div className="borderText">Кількість замовлень для кожного типу товару</div>
                    <PieChart
                        data={convertMap(this.state.typeItemNumber)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="typeItemProfitBorder">
                    <div className="borderText">Відношення доходу для кожного типу товару</div>
                    <PieChart
                        data={convertMap(this.state.typeItemProfit)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="typeItemProfitBorder">
                    <div className="borderText">Відношення доходу для кожного типу товару</div>
                    <PieChart
                        data={convertMap(this.state.typeItemProfit)}
                        label={({ dataEntry }) => dataEntry.title + '\n(' + dataEntry.value + ')'}
                        radius={PieChart.defaultProps.radius - 7}
                        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
                        style={{ height: '200px' }}
                        labelStyle={{ ...defaultLabelStyle }}
                    />
                </div>
                <div className="dateOrdersBorder">
                    <b>Кількість замовлень кожного місяця протягом заданого часу</b>
                    <LineChart width={1500} height={300} data={convertMap2(this.state.dateOrders)}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
                <div className="dateProfitBorder">
                    <b>Щомісячний дохід протягом заданого часу</b>
                    <LineChart width={1500} height={300} data={convertMap2(this.state.dateProfit)}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
            </div>
        );
    }
} export default Statistic; 