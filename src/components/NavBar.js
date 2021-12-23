import { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { NavLink } from "react-router-dom";
import { YOUR_VACANCIES_ROUTE, PROFILE_ROUTE, VACANCY_RESPONSES_ROUTE, CREACTE_VACANCIES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VACANCIES_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button'
import {observer} from "mobx-react-lite"
import { useHistory } from "react-router-dom";
import { logout } from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {vacancyContext} = useContext(Context)
    const history = useHistory()
    return ( 
        <Navbar bg="dark" variant="dark">
        <Container>
        <NavLink style={{textDecoration:'none',fontSize:25,color:'white'}} to={HOME_ROUTE}>HR</NavLink>
        {user.isAuth ?
        <Nav className='ml-auto'>
            {user.role == '1' ? 
            <div>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(VACANCIES_ROUTE)}>VACANCIES</Button>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(PROFILE_ROUTE)}>Profile</Button>
            </div>
            :
            <div>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(VACANCIES_ROUTE)}>VACANCIES</Button>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(YOUR_VACANCIES_ROUTE)}>YOUR VACANCIES</Button>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(CREACTE_VACANCIES_ROUTE)}>CREATE VACANCY</Button>
                <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(VACANCY_RESPONSES_ROUTE)}>VACANCY RESPONSES</Button>
            </div>
            }
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={()=>{logout(); vacancyContext.clearVacancies(); history.push(HOME_ROUTE); user.setIsAuth(false)}}>Logout</Button>
        </Nav>
        :
        <Nav className="ml-auto">
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>Login</Button>
            <Button style={{marginRight:10}} className='ml-2' variant={'outline-light'} onClick={() => history.push(REGISTRATION_ROUTE)}>Sign up</Button>
        </Nav>
        }
        </Container>
      </Navbar>
    );
})
 
export default NavBar;