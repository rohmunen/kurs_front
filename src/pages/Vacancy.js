import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getVacancy } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";
import Card from "react-bootstrap/Card"
import {Container,Form} from 'react-bootstrap'

const Vacancy = observer(() => {
    const [vacancy, setVacancy] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        console.log('here')
        getVacancy(window.location.href.split('/')[4]).then(res => {
            if (res !== null) {
                setVacancy(res)
            }
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return(
        <Container 
        className='d-flex justify-content-center align-items-center'
    >
        <Card style={{width: 800}} className="p-5 mt-3">
                <p style={{fontSize:30}}>VACANCY NAME {vacancy[1]}</p>
                <p>Location: {vacancy[8] + ', ' + vacancy[6]}</p>
                <p>VACANCY SALARY {vacancy[3] + ' ' + vacancy[10]}</p>
                <p>We work in: {vacancy[5]}</p>
                <p>How to get to us: {vacancy[7]}</p>
                <p>Language: {vacancy[9]}</p>
                <p style={{fontSize:25}}>VACANCY DESCRIPTION:</p>
                <p>{vacancy[2]}</p>
        </Card>
        </Container>
        )
    })

export default Vacancy

