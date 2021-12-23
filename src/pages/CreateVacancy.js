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
import FloatingLabel from 'react-bootstrap/FloatingLabel'

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
    const [vacancySalary, setVacancySalary] = useState('')

    const {user} = useContext(Context)
    const click = async () => {
        await createVacancy(localStorage.getItem('user_id'),
         vacancyName.replaceAll(',','‚').replaceAll('--',''),
         vacancyDescription.replaceAll(',','‚').replaceAll('--',''),
         locationName.replaceAll(',','‚').replaceAll('--',''),
         locationAddress.replaceAll(',','‚').replaceAll('--',''),
         locationDetails.replaceAll(',','‚').replaceAll('--',''),
         countryName.replaceAll(',','‚').replaceAll('--',''),
         countryLanguage.replaceAll(',','‚').replaceAll('--',''),
         countryCurrency.replaceAll(',','‚').replaceAll('--',''),
         vacancySalary.replaceAll(',','‚').replaceAll('--','')).then(response =>{
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
        >
            <Card style={{width: 600}} className="p-5 mt-3">
            <Card.Title>Create vacancy</Card.Title>
            <Form className="d-flex flex-column">
            <FloatingLabel
            controlId="floatingInput"
            label="Vacancy name"
            className="mb-1"
            >
                <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy name"
                value = {vacancyName}
                onChange = {e => setVacancyName(e.target.value)}
                />
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Description"
            className="mb-3"
            >
                <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy description"
                value = {vacancyDescription}
                onChange = {e => setVacancyDescription(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Location name"
            className="mb-3"
            >
                <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy location name"
                value = {locationName}
                onChange = {e => setLocationName(e.target.value)}
            />
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Address"
            className="mb-3"
            >
                <Form.Control
                className='mt-2'
                placeholder="Enter your vacancy location address"
                value = {locationAddress}
                onChange = {e => setLocationAddress(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Location details"
            className="mb-3"
            >
                <Form.Control
                className='mt-2'
                placeholder="Enter some details about your vacancy's location"
                value = {locationDetails}
                onChange = {e => setLocationDetails(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Country"
            className="mb-3"
            >
            <Form.Control
                className='mt-2'
                placeholder="Country"
                value = {countryName}
                onChange = {e => setCountryName(e.target.value)}
            />
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Language"
            className="mb-3"
            >
            <Form.Control
                className='mt-2'
                placeholder="Language"
                value = {countryLanguage}
                onChange = {e => setCountryLanguage(e.target.value)}
            />
            </FloatingLabel>

            <FloatingLabel
            controlId="floatingInput"
            label="Currency"
            className="mb-3"
            >
                <Form.Control
                className='mt-2'
                placeholder="Currency"
                value = {countryCurrency}
                onChange = {e => setCountryCurrency(e.target.value)}>
                </Form.Control>
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Salary"
            className="mb-3"
            >
            <Form.Control
                className='mt-2'
                placeholder="Salary"
                value = {vacancySalary}
                onChange = {e => setVacancySalary(e.target.value)}
            />
            </FloatingLabel>
            <Button onClick={click} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                Submit
            </Button>
        </Form>
        </Card>  

        </Container>                
    )
    })
export default CreateVacancy;