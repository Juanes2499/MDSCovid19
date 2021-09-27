import React, {Component} from 'react'
import { Schema, Grid, Row, Col  } from 'rsuite';
import '../global.css'

//global
import {configTable} from '../global';

//Action
import {
    getInformationByCountry, 
} from '../../../Acciones/ListByCountries/ListByCountries';

//Elementos
import {DataTable} from '../../Elements/DataTable/DataTable';
import Filter from '../../Elements/Filter/Filter';
import {Notify} from '../../Elements/Notify/Notify';;

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
        formFilter:[
            {
                name: "country",
                label: "Country",
                type: "text",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[0].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[0].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "recovered",
                label: "Recovered",
                type: "number",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[1].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[1].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "deaths",
                label: "Deaths",
                type: "number",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[2].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[2].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "tests",
                label: "Test Done",
                type: "number",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[3].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[3].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "active",
                label: "Active Cases",
                type: "number",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[4].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[4].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            },
            {
                name: "critical",
                label: "Critical Cases",
                type: "number",
                dataEntryType:'input',
                valueState: '',
                operador: [],
                hadlerValueState: (data) => {
                    let newFilterModal = this.state.formFilter;
                    newFilterModal[5].valueState = data;
                    this.setState({formFilter: newFilterModal});
                },
                handleOperator: (operador) => {
                    let newOperator = this.state.formFilter;
                    newOperator[5].operador = operador;
                    this.setState({formFilter: newOperator});
                }
            }
        ]
    };

    columnasDataTable = [
        {
            key: "country",
            text: "Country",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "todayCases",
            text: "Today Cases",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "recovered",
            text: "Total Recovered",
            width: 150,
            align: "center",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "todayRecovered",
            text: "Today Recovered",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "deaths",
            text: "Total Deaths",
            width: 100,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "todayDeaths",
            text: "Today Deaths",
            width: 150,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "tests",
            text: "Test Done",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "active",
            text: "Active Cases",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "critical",
            text: "Critical Cases",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        },
        {
            key: "dateUpdated",
            text: "Update Date",
            width: 190,
            align: "left",
            fixed: false,
            resizable: true,
            sortable: true
        }
    ]

    bottonsFooterFilter = [
        {
            labelButton: "Search",
            color: "green",
            appearance: "primary",
            icon: true,
            style:{marginLeft:'1%', background: `linear-gradient(90deg, #89c146, #659c22)`, width:'100px'},
            styleLabel: {fontFamily: 'roboto', fontSize:15, fontWeight:'lighter'},
            nameIcon: 'fas fa-search',
            onClick: () => {
                
                let newFormFilter = this.state.formFilter;
                
                let dataFiltered = []
                
                let i = 0;
                newFormFilter.forEach(x => {
                    if(x.valueState !== ''){
                        
                        if(x.type === "number"){
                            this.state.data.filter(y => eval(`y.${x.name}`) > parseInt(newFormFilter[3].valueState)).map((i, n) => {                    
                                dataFiltered.push(i)
                            });
                            this.setState({data: dataFiltered.map((a, indice) => ({ ...a, id: indice + 1 }))})
                        }else if (x.type === "text"){
                            this.state.data.filter(y => eval(`y.${x.name}`).includes(newFormFilter[0].valueState)).map((i, n) => {                    
                                dataFiltered.push(i)
                            });
                            this.setState({data: dataFiltered.map((a, indice) => ({ ...a, id: indice + 1 }))})
                        }
                        i += 1;
                    }
                })
            }
        },
        {
            labelButton: "Clean",
            color: "blue",
            appearance: "ghost",
            icon: true,
            style:{marginLeft:'1%', borderColor:'#659c22', width:'100px'},
            styleLabel: {fontFamily: 'roboto', fontSize:15, fontWeight:'lighter', color:'#659c22'},
            nameIcon: 'fas fa-eraser',
            onClick: () => {

                let newFormFilter = this.state.formFilter;
                
                newFormFilter.forEach(x => {
                    x.valueState = '';
                })

                this.setState({formFilter: newFormFilter});   
                
                getInformationByCountry()
                    .then(result => {
                        this.setState({data: result})
                }).catch((err) => {
                    Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
                })
            },
        },
    ]

    bottonsHeaderFilter = [
        {
            label: "Crear",
            style:{width:100, backgroundColor:'#1d43ad'},
            onClick: () => {
                this.setState({activateModalNewUser: true})
            }
        },
    ]


    closeModal = () => {
        this.setState({activateModal: false})
    }

    closeModalNewUser = () => {
        this.setState({activateModalNewUser: false})
    }
    
    componentDidMount = () => {
        getInformationByCountry()
            .then(result => {
                this.setState({data: result})
        }).catch((err) => {
            Notify('error','Error consultado datos',`Ha ocurrido un problema consultado los datos, por favor recargar la página o vuleva a iniciar sesión.`)
        })
    }

    componentDidUpdate = () => {
        if(this.state.dataActualizada === true){
            getInformationByCountry()
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
                        <Col className="rs-col-lg-18 rs-col-md-18 rs-col-xs-24 fixed">
                            <div className="">
                                <DataTable 
                                    key={this.state.data.id} 
                                    configuration={configTable} 
                                    nameTable='List by country'
                                    iconTable='fas fa-globe-americas fa-2x'
                                    data={this.state.data} 
                                    columns={this.columnasDataTable} 
                                    handleOnRowClick={this.dataSeleccionado}
                                />
                            </div>
                        </Col>

                        <Col>
                            <div className="rs-col-lg-6 rs-col-md-6 rs-col-xs-6 fixed">
                                <Filter
                                    key={2}
                                    titleHeader='Filter'
                                    iconFilter='fas fa-search fa-2x'
                                    bottonsHeader={this.bottonsHeaderFilter}
                                    formFilter={this.state.formFilter}
                                    configuration={configFilter}
                                    actions={this.bottonsFooterFilter}
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
