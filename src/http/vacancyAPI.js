import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
    const {data} = await $host.post('/login', {email, password})
    console.log(data)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getSkills = async() => {
    const {data} = await $authHost.get('/skills')
    return data
}

export const getVacancies = async() => {
    const {data} = await $authHost.get('/vacancies')
    return data
}

export const getVacancy = async (id) => {
    console.log('/vacancy/' + id)
    const {data} = await $authHost.get('/vacancy/' + id)
    return data
}
 
export const createVacancy = async (iss,vacancy_name,
    vacancy_description,
    location_name,
    location_address,
    location_details,
    country_name,    
    country_language,
    country_currency) => {
       const {data} = await $authHost.post('/createvacancy', {iss,
        vacancy_name,
        vacancy_description,
        location_name,
        location_address,
        location_details,
        country_name,    
        country_language,
        country_currency})
    return data
}
 
export const apply = async (iss,vac) => {
    const {data} = await $authHost.post('/apply', {iss,vac})
    return data
}

export const getApplied = async (iss) => {
    const {data} = await $authHost.get('/getapplied/' + iss)
    return data
}

export const getVacancyResponses = async(iss) => {
    const {data} = await $authHost.get('/getvacancyresponses/' + iss)
    return data
}