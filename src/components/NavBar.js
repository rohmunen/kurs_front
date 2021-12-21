import { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { NavLink } from "react-router-dom";
import { CREACTE_VACANCIES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VACANCIES_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button'
import {observer} from "mobx-react-lite"
import { useHistory } from "react-router-dom";
import { logout } from "../http/userAPI";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    return ( 
        <Navbar bg="dark" variant="dark">
        <Container>
        <NavLink style={{color:'white'}} to={HOME_ROUTE}>HR</NavLink>
        {user.isAuth ?
        <Nav className='ml-auto'>
            {user.role == '1' ? 
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(VACANCIES_ROUTE)}>VACANCIES</Button>:
            <div>
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(VACANCIES_ROUTE)}>VACANCIES</Button>
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={() => history.push(CREACTE_VACANCIES_ROUTE)}>CREATE VACANCY</Button>
            </div>
            }
            <Button style={{marginRight:10}} variant={'outline-light'} onClick={()=>{logout(); history.push(HOME_ROUTE); user.setIsAuth(false)}}>Logout</Button>
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