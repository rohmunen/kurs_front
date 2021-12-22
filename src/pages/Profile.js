import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getVacancy } from '../http/vacancyAPI';
import {FormLabel, Spinner} from "react-bootstrap";
import { companyGetEmployee, getemployeeid } from '../http/userAPI';
import {Container,Form} from 'react-bootstrap'
import Skills from '../components/Skills';
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Card from "react-bootstrap/Card"
import { getEmployeeSkills } from '../http/userAPI';
import { HOME_ROUTE } from '../utils/consts';
import { employeeUpdate} from '../http/userAPI';

const Profile = observer(() => {
    const history = useHistory()
    const click = async () => {
        await employeeUpdate(localStorage.getItem('user_id'), name, value, gender, about, age, city, country, pos, yearsOfWork, educationName, educationLevel).then(response =>{
            if (response == 'ok') {
                history.push(HOME_ROUTE)
            }
        }).catch(function(error){
        if (error.response) {
            console.log(error.response.status)
        }
    })
    }
    const [skills, setSkills] = useState()
    const [value, setValue] = useState()
    const [loading, setLoading] = useState(true)
    const [me, setMe] = useState()
    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [gender, setGender] = useState('NS')
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [pos, setPos] = useState('None')
    const [yearsOfWork, setYearsOfWork] = useState('None')
    const [educationName, setEducationName] = useState('None')
    const [educationLevel, setEducationLevel] = useState('None')
    useEffect(()=>{
        setLoading(true)
        getEmployeeSkills(localStorage.getItem('user_id')).then(res => {
            console.log('скилс =)', res)
            setSkills(res)
        })
        getemployeeid(localStorage.getItem('user_id')).then(res => {
            companyGetEmployee(res).then(result => {
                if (result !== null) {
                    console.log(result.employee.substring(1, result.employee.length - 1).split(','))
                    setName(result.employee.substring(1, result.employee.length - 1).split(',')[1])
                }
            }).finally(() => {
                setLoading(false)
            })
        })
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return(
        <Container 
        className='d-flex justify-content-center align-items-center'
        >
        <Card style={{width: 600}} className="p-5 mt-3">
            <Card.Title>Your profile</Card.Title>
        <Form className="d-flex flex-column">
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Your name"
                        className="mb-3"
                        >
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your name"
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        />
                        </FloatingLabel>
                        <FormLabel>
                            Your skills
                            {skills.map(skill => {
                                return <p>{skill.getuserskills.split(',')[1]}</p>
                            })}
                        </FormLabel>
                        <Skills value = {value} setValue = {setValue}/>
                        <FormLabel>
                            Gender
                        </FormLabel>
                        <Form.Select onChange={e => setGender(e.target.value)}>
                            <option>Choose your gender....</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="NS">NS</option>
                        </Form.Select>
                        <FormLabel>
                            About
                        </FormLabel>
                        <textarea
                        className='mt-2'
                        placeholder="Tell a little about yourself"
                        value = {about}
                        onChange = {e => setAbout(e.target.value)}
                        />
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Your age"
                        className="mb-3"
                        >
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your age"
                            value = {age}
                            onChange = {e => setAge(e.target.value)}
                        />
                        </FloatingLabel>  
                        <FloatingLabel
                        controlId="floatingInput"
                        label="City"
                        className="mb-3"
                        >
                        <Form.Control
                            className='mt-2'
                            placeholder="Your city"
                            value = {city}
                            onChange = {e => setCity(e.target.value)}
                        />
                        </FloatingLabel>  
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Country"
                        className="mb-3"
                        >
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your country"
                            value = {country}
                            onChange = {e => setCountry(e.target.value)}
                        />
                        </FloatingLabel>
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Previous job"
                        className="mb-3"
                        >  
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your position at your last job"
                            value = {pos}
                            onChange = {e => setPos(e.target.value)}
                        />
                        </FloatingLabel>
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Years of expirience"
                        className="mb-3"
                        >  
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your years of work"
                            value = {yearsOfWork}
                            onChange = {e => setYearsOfWork(e.target.value)}
                        />
                        </FloatingLabel>
                        <FloatingLabel
                        controlId="floatingInput"
                        label="Education"
                        className="mb-3"
                        >  
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your education"
                            value = {educationName}
                            onChange = {e => setEducationName(e.target.value)}
                        />
                        </FloatingLabel>
                        <FormLabel>
                            Education level
                        </FormLabel>
                        <Form.Select onChange={e => setEducationLevel(e.target.value)}>
                            <option>Choose your education level</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="Doctorate">Doctorate</option>
                        </Form.Select>

                        <Button onClick={click} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                            Update
                        </Button>
                        </Form>
        </Card>
        </Container>
        )
    })

export default Profile