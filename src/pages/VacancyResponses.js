import React, {useContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { COMPLETE_ROUTE } from '../utils/consts';
import VacanciesComponent from '../components/VacanciesComponent'
import {getVacancyResponses} from '../http/vacancyAPI'
import {Spinner} from "react-bootstrap";
import { companyGetEmployee } from '../http/userAPI';
import { getVacancy } from '../http/vacancyAPI';
const VacancyResponses = observer(() => {
    let i = -1;
    const [loading, setLoading] = useState(true)
    const [responses, setResponses] = useState([]);
    const [dataispresent, setDataispresent] = useState(false);
    const history = useHistory()
    const {user} = useContext(Context)
    const {vacancyContext} = useContext(Context)
    useEffect(()=>{
        setLoading(true)
        setDataispresent(false)
        vacancyContext.clearData()
            getVacancyResponses(localStorage.getItem('user_id')).then(res => {
                if (res != ''){
                    setResponses(res)
                    let n = res.length
                    let k = 0
                    new Promise((resolve,reject) => {
                        res.forEach((element) => {
                            vacancyContext.addIds(element.split('/')[1])
                            companyGetEmployee(element.split('/')[1]).then(result =>{
                                vacancyContext.addProfiles(result.employee.substring(1, result.employee.length-1).split(','))
                            }).then(() => {
                                getVacancy(element.split('/')[0]).then(result =>{
                                    vacancyContext.addResponded(result[0].getvacancy.substring(1, result[0].getvacancy.length - 1).split(','))
                                }).finally(()=> {
                                    k++
                                    console.log(k)
                                    if (k===n) resolve()
                                })
                            })
                        })
                    }).then(() => {
                        setDataispresent(true)
                        setLoading(false)
                    })
                }
            })
        }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    if (dataispresent){
        return(
            <div>
                {vacancyContext.profiles.map(element => {
                    i++
                    return <p><a href={"http://localhost:3000/profile/" + vacancyContext.ids[i]}>{element[1]}</a> откликнулся на вакансию <a href={"http://localhost:3000/vacancy/" + vacancyContext.responded[i][0]}>{vacancyContext.responded[i][1]}</a></p>
                })}
            </div>
        )
    } else {
        return (
            <p>Data is not present</p>
        )
    }
})
export default VacancyResponses