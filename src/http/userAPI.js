import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
    const {data} = await $host.post('/connect', {email, password})
    console.log(jwt_decode(data))
    localStorage.setItem('token', data)
    localStorage.setItem('user_id', jwt_decode(data)['id'])
    localStorage.setItem('role', jwt_decode(data)['role'])
    localStorage.setItem('complete', jwt_decode(data)['complete'])
    return jwt_decode(data)
}

export const registration = async (email, password, role) => {
    const {data} = await $host.post('/register', {email, password, role})
    localStorage.setItem('token', data)
    localStorage.setItem('user_id', jwt_decode(data)['id'])
    localStorage.setItem('role', jwt_decode(data)['role'])
    localStorage.setItem('complete', jwt_decode(data)['complete'])
    return jwt_decode(data)
}

export const check = async() => {
    const {data} = await $authHost.get('/auth')
}

export const employeecomplete = async(iss, employee_name, skills) => {
    const {data} = await $authHost.post('/completeemployee', {iss, employee_name, skills})
    return data
}

export const companycomplete = async(iss, company_name) => {
    const {data} = await $authHost.post('/completecompany', {iss, company_name})
    return data
}

export const logout = async() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('role')
    localStorage.removeItem('complete')
    localStorage.clear()
}