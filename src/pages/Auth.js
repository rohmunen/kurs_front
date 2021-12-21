import React, {useContext} from 'react'
import {Container,Form} from 'react-bootstrap'
import { useState } from 'react'
import Card from "react-bootstrap/Card"
import { Button } from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'


const Auth = observer(() => {
    const history = useHistory()
    const {user} = useContext(Context)
    const location = useLocation()
    const [errorMsg, setErrorMsg] = useState('')
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('1')
    const [state, setState] = useState(false)
    const click = async () => {
        if (isLogin) {
            await login(email, password).then(response =>{
                    user.setUser(user)
                    user.setIsAuth(true)
                    user.setRole(localStorage.getItem('role'))
                    user.setIsComplete(localStorage.getItem('complete'))
                    history.push(HOME_ROUTE)
                }).catch(function(error){
                if (error.response) {
                    console.log(error.response.status)
                    setErrorMsg('Incorrect email or password')
                    setState(true)
                }
            })
        } else {
            await registration(email, password, role).then(response => {
                user.setUser(user)
                user.setIsAuth(true)
                user.setRole(localStorage.getItem('role'))
                user.setIsComplete(localStorage.getItem('complete'))
                console.log(user.isComplete)
                history.push(HOME_ROUTE)
            }).catch(function(error){
                if (error.response.status==422) {
                    setErrorMsg('Email must be a valid email address')
                    setState(true)
                } else {
                    setErrorMsg('Email is already in use')
                    setState(true)
                }
            })
        }
    }

    return ( 
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.ineerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5 mt-3">
                <Alert variant='dark' show={state}>
                <p>{errorMsg}</p>
                <Button onClick={() => setState(false)} variant="outline-success">
                    Close me
                </Button>
                </Alert>
                <h2 className="m-auto">{isLogin ? 'Login' : "Register" }</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? '' : <p>Who are you?</p>}
                    {isLogin ? '' : 
                    <Form.Select onChange={e => setRole(e.target.value)}>
                        <option value="1">Employee, looking for a job</option>
                        <option value="2">Company, looking for employees</option>
                    </Form.Select>}

                    <Form.Control
                        className='mt-2'
                        placeholder="Enter your email"
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        type = 'email'
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder="Enter your password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        type = 'password'
                    />
                    <Button onClick={click} style={{width:250,alignSelf:'center'}} className="mt-3" variant={"outline-success"}>
                        Submit
                    </Button>
                </Form>
            </Card>   
        </Container>
     );
})
 
export default Auth;