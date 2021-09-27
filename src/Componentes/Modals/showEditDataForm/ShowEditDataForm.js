import React from 'react'
import { Form, Button, FormGroup, FormControl, Toggle, SelectPicker, Row, Col } from 'rsuite';
import { Modal} from 'rsuite';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './ShowEditDataForm.css';

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, value, readOnly, placeHolderPicker, dataPicker, ...props }) => {

    dataEntryType = dataEntryType.toLowerCase();
    
    if (dataEntryType === 'input'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field' >{label} </p>
                <FormControl 
                    key={key}
                    name={name} 
                    accepter={accepter} 
                    type={type} 
                    onChange={handlerValue} 
                    readOnly={readOnly} 
                    style={{width:300, height:40 ,fontFamily: 'Roboto',  fontSize:15}} 
                    value={value}
                />
            </FormGroup>
        );
    }else if(dataEntryType === 'longText'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field'>{label} </p>
                <FormControl 
                    key={key}
                    name={name} 
                    accepter={accepter}
                    componentClass="textarea" 
                    rows={5}
                    type={type} 
                    onChange={handlerValue} 
                    readOnly={readOnly} 
                    style={{width:300, fontFamily: 'Roboto',  fontSize:15}} 
                    value={value}
                />
            </FormGroup>
        );
    }else if(dataEntryType === 'toggle'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field'>{label}</p>
                <Toggle 
                    key={key}
                    size="md" 
                    checkedChildren="Activo" 
                    unCheckedChildren="Inactivo"
                    checked={value}
                    onChange={handlerValue} 
                    style={{width:300, fontFamily: 'Roboto',  fontSize:15, background: `linear-gradient(90deg, #89c146, #659c22)`}} 
                />
            </FormGroup>
        );
    }else if(dataEntryType === 'selectpicker'){

        return (
            <FormGroup key={key} >
                <p key={key} className='label-field'>{label}</p>
                <SelectPicker
                    size="md"
                    placeholder={placeHolderPicker}
                    data={dataPicker}
                    style={{ width: 350}}
                    onChange={handlerValue}
                    defaultValue={value}
                />
            </FormGroup>
        );
    }
}

const ShowEditDataForm = ({layaout, isActivate, tittleModal, handleClose, modelSchema, fields, bottonFooter, ...props}) => {
    
    return (
        <div>
            <Modal size="md" style={{marginTop:'5%'}} show={isActivate}>
                <Modal.Header closeButton={false}>
                    <Row>
                        <Col className="rs-col-lg-22 fixed">
                            <div style={{display:'flex', alignContent: 'center'}}>
                                <p className='titulo-header'>{tittleModal}</p>
                            </div>
                            
                        </Col>
                        
                        <Col className="rs-col-lg-2 fixed">
                            <div style={{marginTop:'13px', left:'0px'}}>
                                <span className='cerrar-header'> <i className='fas fa-times fa-2x' onClick={handleClose}/> </span> 
                            </div>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <GridList cellHeight={90}  cols={2}  style={{width:'100%'}}>
                    {
                        fields.map((item, index) => {
                            return(
                                <GridListTile key={index}>
                                    <Form className='modal-body' fluid model={modelSchema} layout={layaout}>
                                        <TypeField 
                                            key={index} 
                                            dataEntryType={item.dataEntryType}
                                            name={item.name} 
                                            label={item.label} 
                                            type={item.type} 
                                            value={item.valueState}
                                            handlerValue={item.hadlerValueState} 
                                            readOnly={item.readOnly}
                                            dataPicker={item.dataPicker}
                                            placeHolderPicker={item.placeHolderPicker}
                                        />
                                    </Form>
                                </GridListTile>
                            ) 
                        })
                    }
                    </GridList>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center', marginTop:'25px', paddingBottom:'25px'}}>
                        {
                            bottonFooter.map((item, index) => {
                                return(
                                    <Button key={index} onClick={item.onClick} appearance={item.appearance} style={item.style}> 
                                        <span style={item.styleLabel}>{item.labelButton}</span>
                                    </Button>
                                )
                            })
                        }
                        <Button onClick={handleClose} appearance="ghost" style={{marginLeft:'1%', borderColor:'#659c22', width:'100px'}}>
                            <span style={{fontFamily: 'roboto', fontSize:15, fontWeight:'lighter', color:'#659c22'}}>Cancelar</span>
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowEditDataForm
