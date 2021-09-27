import axios from 'axios'
import Cookies from 'universal-cookie'
import history from '../../Shared/createHistory';

const API_AUTH_HOST = window.API_AUTH_HOST
const cookies = new Cookies();

export const LoginAction_InicialSesion = (email, password, auth) => {

     let loginJson = {
          email: email,
          password: password
     }

     const endpoint = `${API_AUTH_HOST}/api/login`;

     axios.post(endpoint, loginJson)
          .then(response => {
               cookies.set('token', response.data.token, { path: '/' })
               return auth({auth: true, response: null});
          }).catch(err => {
               if (err.response && err.response.status === 401) {
                    return auth({auth: false, response: err.response});
               }
          })
};

export const LoginAction_CerrarSesion = () => {
     history.push('/Home');
}

export const LoginAction_SolicitudCambioContrasena = (email, success) => {

     let data = {
          email: email
     }

     const endpoint = `${API_AUTH_HOST}/api/login/emailPassword`;

     axios.post(endpoint, data)
          .then(() => {
               return success({state: true, response: null});
          }).catch(err => {
               if (err.response && err.response.status === 403) {
                    return success({state: false, response: err.response});
               }
          })
};

export const LoginAction_ActualizarContrasena = (email, oldPassword, newPass, success) => {

     let data = {
          email: email,
          old_password: oldPassword,
          password_auth: newPass,
     }

     const endpoint = `${API_AUTH_HOST}/api/login/updatePassword`;

     axios.put(endpoint, data)
          .then(() => {
               return success({state: true, response: null});
          }).catch(err => {
               if (err.response) {
                    return success({state: false, response: err.response});
               }
          })
};