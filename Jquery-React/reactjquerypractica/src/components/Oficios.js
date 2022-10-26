import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import loading from './../assets/images/img1.jpg';

export default class Oficios extends Component {

    state = {
        statusOficio : false ,
        oficios : [] ,
        statusEmpleado : false ,
        empleados : []
    }

    cargarSelectOficio = () => {
        var request = "/api/Empleados/GetOficios/oficios/";
        var url = Global.urlOficio + request;

        axios.get(url).then(res => {
            this.setState({
                statusOficio : true ,
                oficios : res.data
            });
        });
    }
    componentDidMount = () => {
        this.cargarSelectOficio();
    }

    selectOficio = React.createRef();
    inputIncremento = React.createRef();

    incrementarSalarios = (e) => {
        // e.preventDefault();

        var oficioSelect = this.selectOficio.current.value;
        var request = "/api/Empleados/GetEmpleadosOficio/empleadosoficio/" + oficioSelect;
        var url = Global.urlOficio + request;

        var incremento = parseInt(this.inputIncremento.current.value);

        axios.put(url, incremento).then(res => {
            this.setState({
                statusEmpleado : true ,
                empleados : url
            });
            console.log(this.state.empleados);
        })
    }

    render() {
        if(this.state.statusOficio === false) {
            return (<div>
                <img src={loading} alt="cargando" />
            </div>)
        } else {
            return (<div>
                <h1>Oficios</h1>

                <form>
                    <label>Seleccione el oficio para mostrar a los empleados</label>
                    <select ref={this.selectOficio} onChange={this.cargarSelectOficio}>
                        {
                            this.state.oficios.map((ofi, index) => {
                                return (<option key={index}>{ofi}</option>)
                            })
                        }
                    </select>

                    <hr />
                    <label>Incremento salarial</label>
                    <input type="text" ref={this.inputIncremento} />

                    <hr />
                    <button onClick={this.incrementarSalarios}>Incrementar salario</button>

                    <br /><br />
                </form>

                <table className='table table-bordered table-danger'>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Oficio</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>)
        }
    }
}
