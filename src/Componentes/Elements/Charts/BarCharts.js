import React, {Component, useState} from 'react'
import { Table, IconButton, Icon, Button, Grid, Row, Col} from 'rsuite';
import Card from 'react-bootstrap/Card'
import './charts.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, CartesianAxis, ResponsiveContainer, Brush} from 'recharts';


export const BarCharts = ({configuration, nameReport, iconReport, data, configBars, bars}) => {

    const DataFormater = (number) => {
        //return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return new Intl.NumberFormat('en').format(number)
    }

    const renderCustomizedLabel = (props) => {
        const {
          x, y, width, height, value,
        } = props;
        const radius = 10;
      
        return (
          <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#FFF" />
            <text x={x + width / 2} y={y - radius} fill="#000" textAnchor="middle" dominantBaseline="middle">
              {value}
            </text>
          </g>
        );
    };

    return (
        <div style={configuration.styleCard}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="rs-col-lg-12">
                            <div className='content-name'>
                                <i className={iconReport} style={{color: '#1d43ad', marginRight:'20px'}}></i>
                                <span style={{fontFamily: 'roboto', fontSize:25, fontWeight:'normal', color: '#1d43ad'}}>{nameReport}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                        <div id="grafico">
                        <br />
                        <br />
                            <BarChart
                                width={1700}
                                height={600}
                                data={data}
                                margin={{
                                    top: 0, right: 70, left: 70, bottom: 50,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey={configBars.dataKey} orientation="bottom"/>
                                <YAxis  tick={true} tickFormatter={DataFormater}/>
                                <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
                                <Legend verticalAlign="top" align="center" height={30}/>
                                <Brush dataKey={configBars.dataKey} height={30} stroke="#8884d8" />
                                {
                                    bars.map((item, index) => {
                                        return(
                                            <Bar dataKey={item.dataKey} fill={item.fill} name={item.name}/>
                                        )
                                    })
                                }  
                            </BarChart>
                        <br />
                        <br />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )

}
