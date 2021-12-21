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

const CompleteProfile = observer(() => {
    const [name, setName] = useState('')
    const [value, setValue] = useState([]);
    const {user} = useContext(Context)
    const eclick = async () => {
        await employeecomplete(localStorage.getItem('user_id'), name, value).then(response =>{
            if (response == 'ok') {
                localStorage.setItem('complete', true)
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