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

export const getCompanyId = async(id) => {
    const {data} = await $authHost.get('/getcompanyid/' + id)
    return data
}


export const employeecomplete = async(iss, employee_name, skills, gender, about, age, city,country,pos, yearsOfWork, educationName, educationLevel) => {
    const {data} = await $authHost.post('/completeemployee', {iss, employee_name, skills,gender,about,age,city,country,pos,yearsOfWork,educationName,educationLevel})
    return data
}

export const companycomplete = async(iss, company_name) => {
    const {data} = await $authHost.post('/completecompany', {iss, company_name})
    return data
}

export const employeeUpdate = async (iss, employee_name, skills, gender, about, age, city,country,pos, yearsOfWork, educationName, educationLevel) => {
    const {data} = await $authHost.post('/employeeupdate', {iss, employee_name, skills,gender,about,age,city,country,pos,yearsOfWork,educationName,educationLevel})
    return data
}

export const companyGetEmployee = async (id) => {
    const {data} = await $authHost.get('/companygetemployee/' + id)
    console.log(data)
    return data
}

export const getemployeeid = async(id) => {
    const {data} = await $authHost.get('/getemployeeid/' + id)
    return data
}

export const getProfile = async (id) => {
    console.log(data)
    const {data} = await $authHost.get('/profile/' + id)
    return data
}

export const getEmployeeSkills = async(id) => {
    const {data} = await $authHost.get('/skills/' + id)
    return data
}

export const logout = async() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('role')
    localStorage.removeItem('complete')
    localStorage.clear()
}