import React, {useContext, useLayoutEffect} from 'react'
import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import {Context} from "../index";
import { createVacancy } from '../http/vacancyAPI';
import { VACANCIES_ROUTE } from '../utils/consts';
import { useState } from 'react'
import {Container,Form} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Card from "react-bootstrap/Card"

const CreateVacancy = observer(() => {
    const history = useHistory()
    const [vacancyName, setVacancyName] = useState('')
    const [vacancyDescription, setVacancyDescription] = useState('')
    const [locationName, setLocationName] = useState('')
    const [locationAddress, setLocationAddress] = useState('')
    const [locationDetails, setLocationDetails] = useState('')
    const [countryName, setCountryName] = useState('')
    const [countryLanguage, setCountryLanguage] = useState('')
    const [countryCurrency, setCountryCurrency] = useState('')

    const {user} = useContext(Context)
    const click = async () => {
        await createVacancy(localStorage.getItem('user_id'),
         vacancyName,
         vacancyDescription,
         locationName,
         locationAddress,
         locationDetails,
         countryName,
         countryLanguage,
         countryCurrency).then(response =>{
            if (response == 'ok') {
                history.push(VACANCIES_ROUTE)
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
        style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 mt-3">
            <Form className="d-flex flex-column">
            <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy name"
                value = {vacancyName}
                onChange = {e => setVacancyName(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy description"
                value = {vacancyDescription}
                onChange = {e => setVacancyDescription(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy location name"
                value = {locationName}
                onChange = {e => setLocationName(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy location address"
                value = {locationAddress}
                onChange = {e => setLocationAddress(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Enter some details about your vacancy's location"
                value = {locationDetails}
                onChange = {e => setLocationDetails(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Country"
                value = {countryName}
                onChange = {e => setCountryName(e.target.value)}
            />
                        <Form.Control
                className='mt-2'
                placeholder="Language"
                value = {countryLanguage}
                onChange = {e => setCountryLanguage(e.target.value)}
            />
            <Form.Control
                className='mt-2'
                placeholder="Currency"
                value = {countryCurrency}
                onChange = {e => setCountryCurrency(e.target.value)}
            />
            <Button onClick={click} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                Submit
            </Button>
        </Form>
        </Card>  

        </Container>                
    )
    })
export default CreateVacancy;