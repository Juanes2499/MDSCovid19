import React, {Component} from 'react'
import { Schema, Grid, Row, Col  } from 'rsuite';
import '../global.css'

//global
import {BarsCharts} from '../global';

//Action
import {
    getInformationPerDay, 
} from '../../../Acciones/GlobalDataPerDay/GlobalDataPerDay';

//Elementos
import {DataTable} from '../../Elements/DataTable/DataTable';
import Filter from '../../Elements/Filter/Filter';
import {Notify} from '../../Elements/Notify/Notify';
import {BarCharts} from '../../Elements/Charts/BarCharts';

//Configuration filter 
const configFilter ={
    cellHeight:70,
    cols:3,
    styleIconSummary:{
        color:'white'
    },
    styleLabelSummary: {
        color: 'rgb(255,255,255)',
        fontFamily: "Roboto",
        fontWeight: 'bold',
        fontSize: '150%',
    },
    styleAccordionSummary: {
        backgroundColor:'rgba(17, 0, 94, 0.808)', 
        borderRadius:'5px'
    }
}

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
        getInformationPerDay()
        .then(result => {
                this.setState({data: result})
        }).catch((err) => {
            Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada === true){
            getInformationPerDay()
                .then(result => {
                    this.setState({data: result})
                    this.setState({dataActualizada: false})    
                }).catch((err) => {
                    Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                })
        }
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
