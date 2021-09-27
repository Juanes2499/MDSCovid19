import React, {Component} from 'react'
import { Schema, Grid, Row, Col  } from 'rsuite';
import '../global.css'

//global
import {BarsCharts} from '../global';

//Action
import {
    getInformationCharts, 
} from '../../../Acciones/Reports/Reports';

//Elementos
import {Notify} from '../../Elements/Notify/Notify';
import {BarCharts} from '../../Elements/Charts/BarCharts';


class ListByCountries extends Component {

    state = {
        data: [],
        activateModal: false,
        activateModalNewUser: false,
        dataSeleccionado: {},
        dataActualizada: false,
        showConfirmacion: false,
        tituloConfirmacion:'', 
        cuerpoConfirmacion:'',
        handleAceptarConfirmacion:()=>{

        },       
    };

    configBars = {
        dataKey: "dateUpdate"
    }

    DataBars = [
        {
            dataKey: "cases",
            fill: "#D88918",
            name: "Total Cases",
        },
        {
            dataKey: "recovered",
            fill: "#5DFF67",
            name: "Total Recovered",
        },
        {
            dataKey: "deaths",
            fill: "#FF5D5D",
            name: "Total Deaths",
        }
    ]
    
    componentDidMount = () => {
        getInformationCharts()
        .then(result => {
                this.setState({data: result})
        }).catch((err) => {
            Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        })
    }

    render() {
        return (
            <div>
                <div className='container-global'>
                    <Row>
                        <Col className="rs-col-lg-24 rs-col-md-18 rs-col-xs-24 fixed">
                            <div className="">
                                <BarCharts 
                                    key={this.state.data.id} 
                                    configuration={BarsCharts} 
                                    nameReport='Reports'
                                    iconReport='fas fa-chart-bar fa-2x'
                                    data={this.state.data} 
                                    configBars={this.configBars}
                                    bars={this.DataBars} 
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ListByCountries
