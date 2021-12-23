import React, {useContext, useLayoutEffect} from 'react'
import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import {Context} from "../index";
import Card from "react-bootstrap/Card"
import { Button } from 'react-bootstrap'
import {Container,Form} from 'react-bootstrap'
import { useState } from 'react'
import Skills from '../components/Skills';
import { employeecomplete, companycomplete } from '../http/userAPI';
import { HOME_ROUTE } from '../utils/consts';

const CompleteProfile = observer(() => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [skills, setSkills] = useState('')
    const [about, setAbout] = useState('')
    const [gender, setGender] = useState('NS')
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [pos, setPos] = useState('None')
    const [yearsOfWork, setYearsOfWork] = useState('None')
    const [educationName, setEducationName] = useState('None')
    const [educationLevel, setEducationLevel] = useState('None')
    const [value, setValue] = useState([]);
    const {user} = useContext(Context)
    const eclick = async () => {
        await employeecomplete(localStorage.getItem('user_id'),
            name,
            value,
            gender,
            about,
            age,
            city,
            country,
            pos,
            yearsOfWork,
            educationName,
            educationLevel).then(response =>{
            if (response == 'ok') {
                localStorage.setItem('complete', true)
                user.setIsComplete('true')
                history.push(HOME_ROUTE)
            }
        }).catch(function(error){
        if (error.response) {
            console.log(error.response.status)
        }
    })
    }
    const cclick = async () => {
        await companycomplete(localStorage.getItem('user_id'), name, value).then(response => {
            if (response == 'ok') {
                localStorage.setItem('complete', true)
                user.setIsComplete('true')
                history.push(HOME_ROUTE)
            }
        }).catch(function(error){
            if (error.response) {
                console.log(error.response.status)
            }
        })
    }
    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
        >
            <Card style={{width: 600}} className="p-5 mt-3">
                <div className="m-auto">
                {user.role == 1 ?
                        <Form className="d-flex flex-column">
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your name"
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        />
                        <Skills value = {value} setValue = {setValue}/>
                        <Form.Select onChange={e => setGender(e.target.value)}>
                            <option>Choose your gender....</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="NS">NS</option>
                        </Form.Select>
                        <textarea
                        className='mt-2'
                        placeholder="Tell a little about yourself"
                        value = {about}
                        onChange = {e => setAbout(e.target.value)}
                        />  
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your age"
                            value = {age}
                            onChange = {e => setAge(e.target.value)}
                        />
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your city"
                            value = {city}
                            onChange = {e => setCity(e.target.value)}
                        />
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your country"
                            value = {country}
                            onChange = {e => setCountry(e.target.value)}
                        />
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your position at your last job"
                            value = {pos}
                            onChange = {e => setPos(e.target.value)}
                        />
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your years of work"
                            value = {yearsOfWork}
                            onChange = {e => setYearsOfWork(e.target.value)}
                        />
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your education"
                            value = {educationName}
                            onChange = {e => setEducationName(e.target.value)}
                        />
                        <Form.Select onChange={e => setEducationLevel(e.target.value)}>
                            <option>Choose your education level</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="Doctorate">Doctorate</option>
                        </Form.Select>
                        <Button onClick={eclick} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                            Submit
                        </Button>
                    </Form>
                 : 
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className='mt-2'
                            placeholder="Enter your company name"
                            value = {name}
                            onChange = {e => setName(e.target.value)}
                        />
                        <Button onClick={cclick} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                            Submit
                        </Button>
                    </Form>
                }
                </div>
            </Card>   
        </Container>);
})

export default CompleteProfile;