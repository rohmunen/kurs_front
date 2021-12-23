import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getVacancy } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";
import { companyGetEmployee } from '../http/userAPI';
import Button from 'react-bootstrap/Button'
import {Container, Card} from 'react-bootstrap'

const CheckProfile = observer(() => {
    const [vacancy, setVacancy] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    useEffect(()=>{
        companyGetEmployee(window.location.href.split('/')[4].replaceAll(',','‚').replaceAll('--','')).then(res => {
            if (res !== null) {
                console.log(res.employee.substring(1, res.employee.length - 1).split(','))
                setUser(res.employee.substring(1, res.employee.length - 1).split(','))
            }
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return(
        <Container 
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}>
        <Card style={{width: 600}} className="p-5 mt-3">
            <Card.Title>Profile</Card.Title>
                <p>my email: {user[0]}</p>
                <p>my name is {user[1]}</p>
                <p>preferred job: {user[2]}</p>
                <p>Adress: {user[5]}, {user[4]}</p>
        </Card>

            </Container>
        )
    })

export default CheckProfile