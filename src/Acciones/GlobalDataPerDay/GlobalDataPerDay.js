import { createAxiosInstance } from '../../Shared/helper';

export const getInformationPerDay = () => {

    const endpoint = "/historical/all?lastdays=100";

    return new Promise((resolve, reject) => {
        try {
            createAxiosInstance().get(endpoint)
                .then(Response => {
                    const dataJson = Response.data;

                    const casesList = Object.keys(dataJson.cases);
                    const deathsList = Object.keys(dataJson.deaths);
                    const recoveredList = Object.keys(dataJson.recovered);

                    let dataJsonPerDayArray = []; 

                    let i = 0;
                    casesList.forEach(x => {
                        deathsList.forEach(y => {
                            recoveredList.forEach(j => {
                                if(x === y && y === j){
                                    let newCasesDay = dataJson.cases[casesList[i]]-dataJson.cases[casesList[i-1]]
                                    let dateUpdate = `${new Date(x.toString()).getDate()}-${new Date(x.toString()).getMonth() + 1}-${new Date(x.toString()).getFullYear()}`
                                    dataJsonPerDayArray.push({
                                        dateUpdate: dateUpdate,
                                        cases: dataJson.cases[x],
                                        newCases: isNaN(newCasesDay) ? dataJson.cases[x] : newCasesDay,
                                        deaths: dataJson.deaths[x],
                                        recovered: dataJson.recovered[x]
                                    })
                                }
                            })
                        })
                        i = i + 1;
                    })

                    return resolve(dataJsonPerDayArray)
                }).catch(err => {
                    return reject(err)
                })
        }catch (error){
            return reject(error)
        }
    })
}
