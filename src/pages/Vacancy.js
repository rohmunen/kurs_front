import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getVacancy } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";


const Vacancy = observer(() => {
    const [vacancy, setVacancy] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        console.log('here')
        getVacancy(window.location.href.split('/')[4]).then(res => {
            if (res !== null) {
                console.log('res',res[0].getvacancy.substring(1, res[0].getvacancy.length - 1).split(','))
                setVacancy(res[0].getvacancy.substring(1, res[0].getvacancy.length - 1).split(','))
            }
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return(
            <div className="vacancies_rows">
                <p>qqqqqqqqqqqqq</p>
                <p>VACANCY NAME {vacancy[1]}</p>
            </div>
        )
    })

export default Vacancy

