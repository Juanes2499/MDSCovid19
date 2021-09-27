import React, { useState } from 'react'
import './HeroSection.css';
import {Row, Col } from 'rsuite';
import { withRouter, Link} from "react-router-dom";
import { Form, ButtonToolbar, Button, FormGroup, FormControl, Schema, InputGroup, Icon} from 'rsuite';
import {auth} from '../../../firebaseconfig';
import {Notify} from '../Notify/Notify';

const TextField = (props) => {
    const { name,  placeholder, icon, accepter, type, handlerValue, ...rest } = props;
    return (
        <FormGroup style={{marginTop:'0px', paddingTop:'0px', paddingBottom:'0px', marginBottom:'0px'}}>
            <InputGroup inside>
                <FormControl 
                    placeholder={placeholder} 
                    name={name} 
                    accepter={accepter} 
                    type={type} 
                    onChange={handlerValue} 
                    style={{width:300, height:40, fontFamily:'roboto', fontSize:15, borderRadius:'0px'}} 
                {...rest}/>
                <InputGroup.Addon>
                    <Icon icon={icon} />
                </InputGroup.Addon>
            </InputGroup>
        </FormGroup>
    );
}

const  HeroSection = ({
    type,
    srcVideo,
    srcImg,
    tittle,
    tittle2,
    subtitulo,
    footer,
    login,
    ...props
}) => {

    //Para redireccionar páginas
    const {history} = props;

    const [email, setEmail] = useState(''); //State para almacenar el correo electrónico
    const [password, setPassword] = useState(''); //State para almacenar la contraseña

    //Función para actualizar el estado del correo electrónico
    const emailHandler = (data) => {
        setEmail(data);
    };

    //Función para actualizar el estado de la contraseña
    const passwordHandler = (data) =>{
        setPassword(data);
    }

    const iniciaSesion = (email, pass) => {

        if(email === '' || pass === '' ){
            Notify('warning','Problemas iniciando sesión','Todos los campos son obligatorios.')
        }else{
            window.EMAIL = email
            history.push('/V3/Covid-19/ListByCountries') 
            // auth.signInWithEmailAndPassword(email,pass)
            // .then(res => {
            //     history.push('/Administrator/Authentication/Usuarios') 
            // }).catch(err => {
            //     if(err.code === "auth/wrong-password"){
            //         Notify('error','Error iniciando sesión',`Contraseña incorrecta`)
            //     }else{
            //         Notify('error','Error iniciando sesión',`El correo electónico no existe`)
            //     }
            // })
        }
    }

    return (
        <div className='hero-container'>
            <div className="img-container">
                <img src={srcImg} alt="Portada"/>
            </div> 

            <Row className="show-grid">
                <Col xs={1} sm={4} md={10} >
                    <p className="hero-container-titulo1">{tittle}</p>
                    <p className="hero-container-titulo2">{tittle2}</p>
                    <p className="hero-container-subtitulo">{subtitulo}</p>
                </Col>

                <Col xs={23} sm={20} md={14}>
                    <div className='login-container'> 
                        <div className='login-container-block'>
                            <Form fluid >
                                <div className='login-container-header'>
                                    <p className='titulo-login'>Login</p>    
                                </div>
                                <div className="login-container-fields">
                                    <TextField name="email" placeholder="Correo electrónico" icon="avatar" type="email" handlerValue={emailHandler}/>
                                    <TextField name="password" placeholder="Constraseña" icon="lock" type="password" handlerValue={passwordHandler}/>
                                </div>
                                <ButtonToolbar>
                                    <div className='button-conatiner-login'>
                                        <Button  style={{width:300, backgroundColor:'#2f51e0'}} onClick={() => iniciaSesion(email, password)}>
                                            <p className='login-button-label'> Login</p>
                                        </Button>
                                    </div>
                                </ButtonToolbar>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(HeroSection);
