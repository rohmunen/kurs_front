import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { getVacancy } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";
import { companyGetEmployee } from '../http/userAPI';


const Profile = observer(() => {
    const [vacancy, setVacancy] = useState()
    const [loading, setLoading] = useState(true)
    const [me, setMe] = useState()
    useEffect(()=>{
        companyGetEmployee(localStorage.getItem('user_id')).then(res => {
            if (res !== null) {
                console.log(res.employee.substring(1, res.employee.length - 1).split(','))
                setMe(res.employee.substring(1, res.employee.length - 1).split(','))
            }
        }).finally(() => setLoading(false))
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return(
            <div className="vacancies_rows">
                <p>my email {me[0]}</p>
            </div>
        )
    })

export default Profile