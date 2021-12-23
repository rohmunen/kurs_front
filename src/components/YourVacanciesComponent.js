import { observer } from 'mobx-react-lite'
import { useContext, useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteVacancy, getVacancies } from '../http/vacancyAPI';
import {Context} from "../index";
import { apply } from '../http/vacancyAPI';
import { getApplied } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";
import Card from "react-bootstrap/Card"
import { getCompanyId } from '../http/userAPI';
import {Container} from 'react-bootstrap'



const YourVacanciesComponent = observer(() => {

    const {user} = useContext(Context)
    const {vacancyContext} = useContext(Context)
    const [id, setId] = useState()
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    useEffect(()=>{
        getCompanyId(localStorage.getItem('user_id')).then(res => {
            console.log(res)
            setId(res)
        }).finally(()=>setLoading2(false))
        getVacancies().then(res => {
            if (res !== null) {
                console.log(res)
                vacancyContext.addVacancies(res)
            }
        }).finally(() => setLoading1(false))
    }, [])

    if (loading1 || loading2) {
        return (
            <Spinner animation={"grow"}/>
        )
    }
    return (
        <Container 
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}
        >            
        {vacancyContext.vacancies.map(vacancy =>
            <div>
                {id == parseInt(vacancy[4]) ?                 <Card style={{width: 600}} className="p-5 mt-3">
                <a style={{textDecoration:'none', fontSize:30}}href={"http://localhost:3000/vacancy/" + vacancy[0]}>{vacancy[1]}</a>
                <p style={{marginTop:10}}>Location: {vacancy[8] + ', ' + vacancy[6]}</p>
                <p>Salary: {vacancy[3] != '' ? vacancy[3] + ' ' + vacancy[10]: 'not stated'}</p>
                <Button variant='danger' onClick={()=>{deleteVacancy(localStorage.getItem('user_id'), vacancy[0])}}>DELETE</Button>
                </Card>: ""}
            </div>
        )}
        </Container>
    );
})

 
export default YourVacanciesComponent