import React, { useState } from 'react'
import { withRouter, Link} from "react-router-dom";
import { Form, ButtonToolbar, Button, FormGroup, FormControl, Schema} from 'rsuite';
import './Login.css';
import 'rsuite/dist/styles/rsuite-default.min.css'

//Elemnt
import {Notify} from '../../Elements/Notify/Notify';

//Aciones
import { LoginAction_InicialSesion, LoginAction_SolicitudCambioContrasena, LoginAction_ActualizarContrasena} from '../../../Acciones/Login/LoginAction';

//Schema
const { StringType } = Schema.Types;

//Modal para validar la información que se esta escribiendo
const model = Schema.Model({
    email: StringType()
        .isEmail('Por favor ingresar un dirección de correo valido')
        .isRequired('Este campo es requerido'),
    password: StringType().isRequired('Este campo es requerido'),
});

const modelNewPass = Schema.Model({
    oldPass: StringType().isRequired('Este campo es requerido'),
    newPass: StringType()
        .isRequired('Este campo es requerido')
        .minLength(10, 'La logintud mínima de la contraseña es 10')
        .containsNumber('La contraseña debe contener números')
        .containsUppercaseLetter('La contraseña debe contener letras mayúsculas')
        .containsLowercaseLetter('La contraseña debe contener letras minúsculas'),
    newPassConfirm: StringType()
        .isRequired('Este campo es requerido')
        .minLength(10, 'La logintud mínima de la contraseña es 10')
        .containsNumber('La contraseña debe contener números')
        .containsUppercaseLetter('La contraseña debe contener letras mayúsculas')
        .containsLowercaseLetter('La contraseña debe contener letras minúsculas'),
});

//Se crea un componente para que sea laber y field
const TextField = (props) => {
    const { name, label, accepter, type, handlerValue, ...rest } = props;
    return (
        <FormGroup>
            <p className='label-field'>{label} </p>
            <FormControl name={name} accepter={accepter} type={type} onChange={handlerValue} style={{width:300, height:40 ,fontFamily: 'Roboto',  fontSize:15}} {...rest}/>
        </FormGroup>
    );
}

const Login = ({isActivate, handleClose, ...props}) => {
    
    //Para redireccionar páginas
    const {history, location, match} = props;

    const [email, setEmail] = useState(''); //State para almacenar el correo electrónico
    const [password, setPassword] = useState(''); //State para almacenar la contraseña

    const [modalPassword, setModalPassword] = useState(true) //State para abrir el modal para cambiar la contraseña
    const [oldPassword, setOldPassword] = useState(''); //State para almacenar la contraseña antigua
    const [newPassword, setNewPassword] = useState(''); //State para almacenar la contraseña nueva
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(''); //State para almacenar la contraseña nueva confirmada

    //Función para actualizar el estado del correo electrónico
    const emailHandler = (data) => {
        setEmail(data);
    };

    //Función para actualizar el estado de la contraseña
    const passwordHandler = (data) =>{
        setPassword(data);
    }

    //Función para actualizar el estado de la contraseña antigua
    const oldPasswordHandler = (data) =>{
        setOldPassword(data);
    }

    //Función para actualizar el estado de la contraseña nueva
    const newPasswordHandler = (data) =>{
        setNewPassword(data);
    }

    //Función para actualizar el estado de la contraseña nueva confirmada
    const newPasswordConfirmHandler = (data) =>{
        setNewPasswordConfirm(data);
    }

    //Función para actualizar el estado del modal de la contraseña nueva
    const closeModalNewPasswordHandler = (data) =>{
        setModalPassword(true);
    }

    //Función para inicial sesión
    const iniciaSesion = (email, pass, handleClosLogin) => {

        if(email === '' || pass === '' ){
            Notify('warning','Problemas iniciando sesión','Todos los campos son obligatorios.')
        }else{
            LoginAction_InicialSesion(email, pass, (authorized) => {
                if (authorized.auth) {
                    history.push('/Administrator')  
                } else if(authorized.auth === false && authorized.response.data.code === 'LOGIN_ERROR_02'){
                    Notify('error','Error iniciando sesión',`${authorized.response.data.message}`)
                    setModalPassword(false);
                } else if(authorized.auth === false){
                    Notify('error','Error iniciando sesión',`${authorized.response.data.message}`)
                }
            });
        }

    }

    //Función para actualizar la contraseña
    const actulizarPassword = (email, oldPass, newPass, newPassConfirm) => {

        if(oldPass === '' || newPass === '' || newPassConfirm === ''){

            Notify('warning','Problemas actualizando contraseña','Todos los campos son obligatorios.')
        
        }else {

            if(oldPass === ''){

                Notify('warning','Problemas actualizando contraseña','Por favor ingresar en Contraseña anterior la contraseña que fue enviada al correo registrado.')
            
            }else{

                if(newPass !== newPassConfirm){
                   
                    Notify('warning','Problemas actualizando contraseña','La contraseña nueva y la confirmación no coinciden.')
                
                }else{
                    LoginAction_ActualizarContrasena(email, oldPass, newPassConfirm, (success) => {
                        if (success.state) {
                            Notify('success','Actualización contraseña',`La contraseña para el correo: ${email} ha sido actualizada correctamente`)
                            setModalPassword(true); 
                            setOldPassword('');
                            setNewPassword('');
                            setNewPasswordConfirm('');
                        } else if(success.state === false){
                            Notify('error','Error enviando de correo',`${success.response.data.message}`) 
                        }
                    })
                }       
            }
        }
    }

    const cambiarPassword = (email) => {

        if(email === ''){
            Notify('warning','Problemas recuperando contraseña','Por favor llenar el campo Correo electrónico')
        }else{
            LoginAction_SolicitudCambioContrasena(email,(success) => {
                if (success.state) {
                    Notify('success','Envio de correo',`Se ha enviado su contraseña temporal al correo: ${email}, por favor ingresar sesión nuevamente para cambiar la contraseña.`) 
                } else if(success.state === false){
                    Notify('error','Error enviando de correo',`${success.response.data.message}`) 
                }
            })
        }
    }
    
    return (
        <div>
            <div key={1} hidden={isActivate} className='login-modal-container'> 
                <div className='login-modal-block'>
                    <div className='login-modal-header'>
                        <p className='titulo-header'>Iniciar Sesión</p>    
                        <span className='cerrar-header'> <i className='fas fa-times fa-lg' onClick={handleClose}/> </span> 
                    </div>
                    <div className='login-modal-linea'></div>
                    <div className='login-modal-body'>
                        <Form fluid model={model} layout="horizontal">
                            <TextField name="email" label="Correo electrónico" type="email" handlerValue={emailHandler}/>
                            <TextField name="password" label="Constraseña" type="password" handlerValue={passwordHandler}/>
                            <ButtonToolbar>
                                <div className='button-login'>
                                    <Button color='green' style={{width:130}} onClick={() => iniciaSesion(email, password, handleClose)}>
                                        <div className='button-login-container'>
                                            <i className="fas fa-sign-in-alt"/>
                                            <p className='button-label'> Iniciar Sesión</p>
                                        </div>
                                    </Button>
                                <Button color='red' style={{width:130}} onClick={handleClose}>
                                    <div className='button-login'>
                                        <i className="far fa-times-circle"></i>
                                        <p className='button-label'>Cancelar</p>
                                    </div>
                                </Button>
                                </div>
                            </ButtonToolbar>
                            <Link onClick={() => cambiarPassword(email)} style={{ marginTop:'10%', display:'flex', justifyContent:'center'}}><p className='button-label'>Olvidé mi contraseña</p></Link>
                        </Form>
                    </div>
                </div>
            </div>

            <div key={1} hidden={modalPassword} className='login-modal-container'> 
                <div className='new-passoword-modal-block'>
                    <div className='new-passoword-modal-header'>
                        <p className='titulo-header'>Cambiar contraseña</p>    
                    </div>
                    <div className='login-modal-linea'></div>
                    <div className='login-modal-body'>
                        <Form fluid model={modelNewPass} layout="horizontal">
                            <TextField name="oldPass" label="Contraseña anterior" type="password" handlerValue={oldPasswordHandler}/>
                            <TextField name="newPass" label="Contraseña nueva" type="password" handlerValue={newPasswordHandler}/>
                            <TextField name="newPassConfirm" label="Confirmar Contraseña nueva" type="password" handlerValue={newPasswordConfirmHandler}/>
                            <ButtonToolbar>
                                <div className='button-login'>
                                    <Button color='yellow' style={{width:130}} onClick={() => actulizarPassword(email, oldPassword, newPassword, newPasswordConfirm)}>
                                        <div className='button-login-container'>
                                            <i className="fas fa-key"/>
                                            <p className='button-label'> Actualizar</p>
                                        </div>
                                    </Button>
                                <Button color='red' style={{width:130}} onClick={closeModalNewPasswordHandler}>
                                    <div className='button-login'>
                                        <i className="far fa-times-circle"></i>
                                        <p className='button-label'>Cancelar</p>
                                    </div>
                                </Button>
                                </div>
                            </ButtonToolbar>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login);
