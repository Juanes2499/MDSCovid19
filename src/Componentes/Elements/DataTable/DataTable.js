import React, {Component, useState} from 'react'
import { orderBy } from 'lodash';
import { Table, IconButton, Icon, Button, Grid, Row, Col} from 'rsuite';
import Card from 'react-bootstrap/Card'
import './DataTable.css';
const { Column, HeaderCell, Cell, Pagination } = Table;


export const DataTableRowsAction = ({configuration, data, columns, handleOnRowClick}) => {

    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (dataKey) =>{

        setPage(dataKey)  
    }

    const handleChangeLength = (dataKey) => {
        setPage(1)
        setDisplayLength(dataKey)          
    }
    
    const getData = (data) => {
        const datos = data.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
                
        return datos
    }
    
    return (
        <div style={configuration.style}>
            <Table
                width={configuration.width}
                height={configuration.height}
                data={getData(data)}
                onRowClick={handleOnRowClick}
                bordered={configuration.bordered}
                cellBordered={configuration.cellBordered}
                autoHeight={configuration.autoHeight}
                style={configuration.style}
                loading={loading}
            >
                {
                    columns.map((item, index) => {
                        return(
                            <Column key={index} width={item.width} align={item.align} fixed={item.fixed} resizable={configuration.resizable}>
                                <HeaderCell 
                                    style={configuration.headerStyle} 
                                >
                                    {item.text}
                                </HeaderCell>
                                <Cell 
                                    dataKey={item.key} 
                                    style={configuration.cellStyle}
                                />
                            </Column>
                        )
                    })
                }           
            </Table>
            <Table.Pagination
                lengthMenu={[
                    {
                        value: 5,
                        label: 5
                    },
                    {
                        value: 10,
                        label: 10
                    },
                    {
                        value: 15,
                        label: 15
                    },
                    {
                        value: 20,
                        label: 20
                    }
                ]}
                activePage={page}
                displayLength={displayLength}
                total={data.length}
                onChangePage={handleChangePage}
                onChangeLength={handleChangeLength}
            />
        </div>
    )

}

const ActionCell = ({ rowData, dataKey, buttons, ...props }) => {
    return (
        <div>
            <Cell {...props} className="link-group"  style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                {
                    buttons.map((item, index) => {
                        return(
                            <Button key={index} onClick={() => item.onClick(rowData, dataKey)} appearance={item.appearance} style={{borderRadius:'100%'}}>
                                 <i className={item.nameIcon}></i> 
                            </Button>
                        )
                    })
                }
            </Cell>
        </div>
    );
};

export const DataTableColAction = ({configuration, nameTable, iconTable, data, columns, buttonsHeader, buttonActions}) => {

    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (dataKey) =>{

        setPage(dataKey)  
    }

    const handleChangeLength = (dataKey) => {
        setPage(1)
        setDisplayLength(dataKey)          
    }
    
    const getData = (data) => {
        const datos = data.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
                
        return datos
    }

    return (
        <div style={configuration.styleCard}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="rs-col-lg-12">
                            <div className='content-name-table'>
                                <i className={iconTable} style={{color: '#1d43ad', marginRight:'20px'}}></i>
                                <span style={{fontFamily: 'roboto', fontSize:25, fontWeight:'normal', color: '#1d43ad'}}>{nameTable}</span>
                            </div>
                        </Col>
                        <Col className="rs-col-lg-12">
                            <div className='content-name-button'>
                                {
                                    buttonsHeader.map((item, index) => {
                                        return(
                                            <Button  style={item.style} onClick={item.onClick}>
                                                <p className='button-table'> {item.label}</p>
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Table
                        width={configuration.width}
                        height={configuration.height}
                        data={getData(data)}
                        bordered={configuration.bordered}
                        cellBordered={configuration.cellBordered}
                        autoHeight={configuration.autoHeight}
                        style={configuration.styleTable}
                        loading={loading}
                    >
                        {
                            columns.map((item, index) => {
                                return(
                                    <Column key={index} width={item.width} align={item.align} fixed={item.fixed} resizable={configuration.resizable}>
                                        <HeaderCell 
                                            style={configuration.headerStyle} 
                                        >
                                            {item.text}
                                        </HeaderCell>
                                        <Cell 
                                            dataKey={item.key} 
                                            style={configuration.cellStyle}
                                        />
                                    </Column>
                                )
                            })
                        }    
                        <Column width={configuration.ActionCellStyle.width} fixed='right'>
                            <HeaderCell style={configuration.headerStyle}>Acciones</HeaderCell>
                            <ActionCell dataKey={buttonActions.dataKey} buttons={buttonActions.actions}/>
                        </Column>       
                    </Table>
                    <Table.Pagination
                        lengthMenu={[
                            {
                                value: 5,
                                label: 5
                            },
                            {
                                value: 10,
                                label: 10
                            },
                            {
                                value: 15,
                                label: 15
                            },
                            {
                                value: 20,
                                label: 20
                            }
                        ]}
                        activePage={page}
                        displayLength={displayLength}
                        total={data.length}
                        onChangePage={handleChangePage}
                        onChangeLength={handleChangeLength}
                    />
                </Card.Body>
            </Card>
        </div>
    )

}


export const DataTable = ({configuration, nameTable, iconTable, data, columns}) => {

    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(5);
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const handleChangePage = (dataKey) =>{

        setPage(dataKey)  
    }

    const handleChangeLength = (dataKey) => {
        setPage(1)
        setDisplayLength(dataKey)          
    }
    
    const getData = (data) => {

        if (sortColumn && sortType) {
            return data.sort((a, b) => {
              let x = a[sortColumn];
              let y = b[sortColumn];
              if (typeof x === 'string') {
                x = x.charCodeAt();
              }
              if (typeof y === 'string') {
                y = y.charCodeAt();
              }
              if (sortType === 'asc') {
                return x - y;
              } else {
                return y - x;
              }
            });
          }

        const datos = data.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
                
        return datos
    }

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setSortColumn(sortColumn);
          setSortType(sortType);
        }, 500);
      };

    return (
        <div style={configuration.styleCard}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col className="rs-col-lg-12">
                            <div className='content-name-table'>
                                <i className={iconTable} style={{color: '#1d43ad', marginRight:'20px'}}></i>
                                <span style={{fontFamily: 'roboto', fontSize:25, fontWeight:'normal', color: '#1d43ad'}}>{nameTable}</span>
                            </div>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Table
                        width={configuration.width}
                        height={configuration.height}
                        data={getData(data)}
                        sortColumn={sortColumn}
                        sortType={sortType}
                        onSortColumn={handleSortColumn}
                        loading={loading}
                        bordered={configuration.bordered}
                        cellBordered={configuration.cellBordered}
                        autoHeight={configuration.autoHeight}
                        style={configuration.styleTable}
                    >
                        {
                            columns.map((item, index) => {
                                return(
                                    <Column key={index} width={item.width} align={item.align} fixed={item.fixed} resizable={configuration.resizable} sortable>
                                        <HeaderCell 
                                            style={configuration.headerStyle} 
                                        >
                                            {item.text}
                                        </HeaderCell>
                                        <Cell 
                                            dataKey={item.key} 
                                            style={configuration.cellStyle}
                                        />
                                    </Column>
                                )
                            })
                        }    
                    </Table>
                    <Table.Pagination
                        lengthMenu={[
                            {
                                value: 5,
                                label: 5
                            },
                            {
                                value: 10,
                                label: 10
                            },
                            {
                                value: 20,
                                label: 20
                            },
                            {
                                value: 30,
                                label: 30
                            },
                            {
                                value: 50,
                                label: 50
                            },
                            {
                                value: 70,
                                label: 70
                            },
                            {
                                value: 100,
                                label: 100
                            }
                        ]}
                        activePage={page}
                        displayLength={displayLength}
                        total={data.length}
                        onChangePage={handleChangePage}
                        onChangeLength={handleChangeLength}
                    />
                </Card.Body>
            </Card>
        </div>
    )

}
