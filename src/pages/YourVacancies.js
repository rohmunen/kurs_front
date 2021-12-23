import React, {useContext} from 'react'
import { useState } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '../index';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { COMPLETE_ROUTE } from '../utils/consts';
import YourVacanciesComponent from '../components/YourVacanciesComponent'
import {Container} from 'react-bootstrap'

const Vacancies = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const [value, setValue] = useState(['none']);
    const handleChange = (val) => {
        setValue(val)
    }
    return(
            <Container 
            className='d-flex justify-content-center align-items-center'
            >
                <p> {user.isComplete == "true" ? <YourVacanciesComponent/>: <Button variant="outline-success" onClick={() => history.push(COMPLETE_ROUTE)}>Complete your profile to view vacancies</Button>} </p>
            </Container>
        )
    })

export default Vacancies

