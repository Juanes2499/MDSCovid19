import Cookies from 'universal-cookie'
import { createAxiosInstance, decodeToken } from '../../Shared/helper';
import history from '../../Shared/createHistory';
import * as RiIcons from 'react-icons/ri';

const cookies = new Cookies();

export const SidebarAction_ConsultarMenu = () => {

    return new Promise((resolve, reject) => {

        let token = '';
        let decodificado = {};
        
        try {
        
            token =  cookies.get('token');
    
            decodeToken(token, (res) => {
                decodificado['PERMISOS'] = res.PERMISOS;
            })
        
            var permisosKeys = Object.keys(decodificado.PERMISOS).sort();
            let permisosArray = []
            var permisosAsignadoKeys = [];

            //Se recorre los permisos de mciroservicios que tenga en el token recibido y los permisos de los módulos que tenga asignado
            permisosKeys.forEach(x => {
                permisosArray.push(`${x.replace("MS_","")}`);
                permisosAsignadoKeys.push(Object.keys(decodificado.PERMISOS[x]).sort());
            })

            let permisosAsignadosArray = [];
            let permisosAsignadosArraySinComillas = [];

            //Se recorre los permisos de los módulos qpara poder quitar la palabra MOD
            permisosAsignadoKeys.forEach(x => {
                x.forEach(j => {
                    permisosAsignadosArraySinComillas.push(`${j.replace("MOD_","")}`);
                    permisosAsignadosArray.push(`'${j.replace("MOD_","")}'`);
                })
            })
            
            //Se forma la data que se enevia para consultar la configuración de microservicios con módulos
            let dataConfiguracionMSM = {
                "seleccionar":"NOMBRE_MICROSERVICIO, ALIAS_MICROSERIVICIO, ICON_MICROSERVICIO, ORDEN_MICROSERVICIO, NOMBRE_MODULO, ALIAS_MODULO, URL_ALIAS_MODULO, ICON_MODULO, ORDEN_MODULO",
                "condicion":{
                    "NOMBRE_MODULO": {
                        "conector_logico":"",
                        "operador": "IN",
                        "valor_condicion": `${permisosAsignadosArray.toString()}`
                    }
                },
                "agrupar":"",
                "ordenar":"ORDEN_MICROSERVICIO ASC, ORDEN_MODULO ASC"
            }


            //Se crea el array que va a contener toda la data para el sidebar
            let dataSidebarArray = []

            const endpointMicroserviciosModulo = '/api/configuracion_microservicio_modulos_open'
            Promise.all([
                createAxiosInstance().post(endpointMicroserviciosModulo, dataConfiguracionMSM),
            ])
            .then(([microservicios]) => {

                const dataTemporal = microservicios.data.data; //.map((a, indice) => ({ ...a, Id: indice + 1 }))

                permisosArray.forEach(x => {

                    //Obtenemos el incono del micoservicio: separando en arrays los microservicios, hacemos un distinc del alias del microservicio con map y filter y guarada el iconos en un array de 1x1 y se convierte a cadena
                    const aliasMicroservicio = dataTemporal.filter(j => j.NOMBRE_MICROSERVICIO === x ).map(item => item.ALIAS_MICROSERIVICIO).filter((value, index, self) => self.indexOf(value) === index).toString()

                    //Obtenemos el incono del micoservicio: separando en arrays los microservicios, hacemos un distinc del icono del microservcio con map y filter y guarada el iconos en un array de 1x1 y se convierte a cadena
                    const iconMicroservicio = dataTemporal.filter(j => j.NOMBRE_MICROSERVICIO === x ).map(item => item.ICON_MICROSERVICIO).filter((value, index, self) => self.indexOf(value) === index).toString()

                    //Obtenemos el orden del micoservicio: separando en arrays los microservicios, hacemos un distinc del icono del microservcio con map y filter y guarada el orden en un array de 1x1 y se convierte a cadena
                    const ordenMicroservicio = dataTemporal.filter(j => j.NOMBRE_MICROSERVICIO === x ).map(item => item.ORDEN_MICROSERVICIO).filter((value, index, self) => self.indexOf(value) === index).toString()

                    let subNabArray = [];

                    const arrayPorMicroservicio = dataTemporal.filter(j => j.NOMBRE_MICROSERVICIO === x)
                    
                    //Se consulta cada uno de los módulos y se los asocia con el microservicios para formar la data total
                    permisosAsignadosArraySinComillas.forEach(k => {
                        if (arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k).length !== 0){
                            let aliasModulo = '';
                            let urlModulo = '' ;
                            let iconModulo = '';
                            let ordenModulo = 0;
                            aliasModulo = arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k)[0].ALIAS_MODULO;
                            urlModulo = arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k)[0].URL_ALIAS_MODULO;
                            iconModulo = arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k)[0].ICON_MODULO !== null ? arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k)[0].ICON_MODULO : "fab fa-react";
                            ordenModulo = arrayPorMicroservicio.filter(j => j.NOMBRE_MODULO === k)[0].ORDEN_MODULO;

                            //Se forma el objeto de cada modulo 
                            let dataSubnavObject ={
                                title: aliasModulo,
                                path: urlModulo,
                                icon: iconModulo,
                                orden: ordenModulo
                            }
                            subNabArray.push(dataSubnavObject)
                        }
                        
                    })
                    
                    //Se forma el objeto de cada microservicio 
                    let dataSidebarObject = {
                        title: aliasMicroservicio,
                        icon: iconMicroservicio,
                        iconClosed: <RiIcons.RiArrowDownSFill />,
                        iconOpened: <RiIcons.RiArrowUpSFill />,
                        orden: ordenMicroservicio,
                        subNav: subNabArray
                    } 

                    dataSidebarArray.push(dataSidebarObject);
                })
                return resolve(dataSidebarArray);
            }).catch(err => {
                return reject(err)
            })

        }catch{
            history.push('/Home');
        }
    });
}