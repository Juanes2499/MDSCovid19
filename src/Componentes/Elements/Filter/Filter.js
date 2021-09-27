import React, {useContext} from 'react'
import { Form, Button, FormGroup, Toggle, DatePicker, SelectPicker, MultiCascader, FormControl } from 'rsuite';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionActions from '@material-ui/core/AccordionActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { operadoresConectoresFiltro } from '../../../Shared/maestras';
import './Filter.css';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';



const SelectPickerMaestra = ({selectPickerType, data, handleOperator}) => {
  return (
    <MultiCascader
      size="md"
      placeholder={<span style={{fontFamily: 'Roboto', fontSize:12}}>Select</span>}
      data={data}
      searchable={false}
      style={{ width: 100, height:35, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
      onChange={handleOperator}
    />
  )
  // if(selectPickerType === 1){
  //   console.log(selectPickerType)
  //   return (
  //     <SelectPicker
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }else if(selectPickerType === 2){
  //   console.log(selectPickerType)
  //   return (
  //     <MultiCascader
  //       size="md"
  //       placeholder="Select"
  //       data={data}
  //       style={{ width: 100, display: 'block', marginBottom: 1, fontFamily:'Roboto'}}
  //       onChange={handleOperator}
  //     />
  //   )
  // }
}

const TypeField = ({dataEntryType, key, name, label, accepter, type, handlerValue, handleOperator, value, selectPickerType, valueSelectPicker, inputFieldStyle, ...rest }) => {
    
  dataEntryType = dataEntryType.toLowerCase();
  
  if (dataEntryType === 'input'){
    return (
        <FormGroup key={key}>
              <p className='label-field'  key={key} >{label} </p>
              <FormControl
                  key={key}
                  name={name} 
                  accepter={accepter} 
                  type={type} 
                  onChange={handlerValue} 
                  style={inputFieldStyle.field} 
                  value={value}
                  {...rest}
              />
              <div style={{width:'3%', color:'white'}}>|   |</div>
        </FormGroup>
    );
  }else if(dataEntryType === 'toggle'){
    return (
        <FormGroup key={key} >
            <div className='toggle-box'>
                <div className='label-box'>
                  <p className='label-field'  key={key} >{label} </p>
                </div>
                <Toggle 
                    key={key}
                    size="lg" 
                    checkedChildren="true" 
                    unCheckedChildren="false"
                    defaultChecked={value}
                    onChange={handlerValue} 
                />
            </div>
        </FormGroup>
    );
  }else if(dataEntryType === 'datepicker'){
    return (
      <FormGroup key={key} >
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <SelectPickerMaestra key={key} data={valueSelectPicker} handleOperator={handleOperator}/>
          <DatePicker 
            key={key}
            format='YYYY-MM-DD'
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>|   |</div>
        </div>
      </FormGroup>
    );
  }else if(dataEntryType === 'timepicker'){
    return (
      <FormGroup key={key} >
        <div className='label-maestra-field-box'>
          <div className='label-box'>
            <p className='label-field'  key={key} >{label} </p>
          </div>
          <DatePicker 
            key={key}
            format="HH:mm"
            ranges={[]}
            style={inputFieldStyle.field} 
            onChange={handlerValue} 
          />
          <div style={{width:'3%', color:'white'}}>|   |</div>
        </div>
      </FormGroup>
    );
  }
}

const lgStyle ={
  field: { width: 300, height:35 , fontFamily: 'roboto',fontSize:15}
}

const mdStyle ={
  field: { width: 200, height:35, fontFamily: 'roboto',fontSize:15 }
}

const smStyle ={
  field: {width: 100, height:35, fontFamily: 'roboto',fontSize:15 }
}

const Filter = ({titleHeader, iconFilter, bottonsHeader, formFilter, configuration, actions, ...props}) => {
  
  const styleFields = (screenWidth) => {
    if (isWidthUp('lg', screenWidth)) {
      return lgStyle;
    }
    
    if (isWidthUp('md', screenWidth)) {
      return mdStyle;
    } 
    return smStyle;
  };

  window.addEventListener('resize', styleFields); //Es un listener para detectar cuando cambia el tamaño de la pantalla

  const fieldStyle = styleFields(props.width);
  
  return (
    <div style={{backgroundColor:'#FFF', borderRadius:'10px', height:'100%', display:'fixed'}}>
        <Card>
            <Card.Header>
              <div className='content-name'>
                <i className={iconFilter} style={{color: '#1d43ad', marginRight:'20px'}}></i>
                <span style={{fontFamily: 'roboto', fontSize:25, fontWeight:'normal', color: '#1d43ad'}}>{titleHeader}</span>
              </div>
            </Card.Header>
            <div>
              <Card.Body>
                <GridList cellHeight={configuration.cellHeight} cols={1}>
                  {
                    formFilter.map((item, index)=>{
                      return(
                        <GridListTile key={index} className='container-filter'>
                          <Form layout='vertical'>
                            <TypeField 
                                key={index} 
                                dataEntryType={item.dataEntryType}
                                name={item.name} 
                                label={item.label} 
                                type={item.type} 
                                value={item.valueState}
                                handlerValue={item.hadlerValueState} 
                                handleOperator={item.handleOperator}
                                selectPickerType={1}
                                inputFieldStyle={fieldStyle}
                                valueSelectPicker={operadoresConectoresFiltro}
                              />
                            </Form>
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
              </Card.Body>
              <Card.Footer>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center', marginTop:'25px', paddingBottom:'25px'}}>
                  {
                    actions.map((item, index) => {
                        return(
                            <Button key={index} onClick={item.onClick} appearance={item.appearance} style={item.style}> 
                                <span style={item.styleLabel}>{item.labelButton}</span>
                            </Button>
                        )
                    })
                  }
                </div>
              </Card.Footer>
            </div>
        </Card>
    </div>
  )
}

export default withWidth()(Filter)
