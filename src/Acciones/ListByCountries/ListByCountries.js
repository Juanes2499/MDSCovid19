import { createAxiosInstance } from '../../Shared/helper';

export const getInformationByCountry = () => {

    const endpoint = "/countries";

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().get(endpoint)
                .then(Response => {
                    let dataJson = Response.data.map((a, indice) => ({...a, dateUpdated: `${new Date(1*a.updated.toString()).getDate()}-${new Date(1*a.updated.toString()).getMonth() + 1}-${new Date(1*a.updated.toString()).getFullYear()} ${new Date(1*a.updated.toString()).getHours()}:${new Date(1*a.updated.toString()).getMinutes()}:${new Date(1*a.updated.toString()).getSeconds()}`}))
                    return resolve(dataJson)
                }).catch(err => {
                    return reject(err)
                })
        }catch (error){
            return reject(error)
        }
    })
}
