import React, {useContext} from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "../index"
import {Container} from 'react-bootstrap'

const Home = observer(() => {

    const {user} = useContext(Context)
    return (
        <Container 
        className='d-flex justify-content-center align-items-center'
        >

        <h1 style={{fontSize:70, marginTop:100}}>This is the home page of HR website.</h1>
    </Container>);
})

export default Home;