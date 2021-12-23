import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import {Spinner} from "react-bootstrap";
import { companyGetEmployee } from '../http/userAPI';
import Button from 'react-bootstrap/Button'

const CheckProfile = observer(() => {
    const [vacancy, setVacancy] = useState()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()
    useEffect(()=>{
        companyGetEmployee(window.location.href.split('/')[4]).then(res => {
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
            <div className="vacancies_rows">
                <p>my email {user[0]}</p>
            </div>
        )
    })

export default CheckProfile