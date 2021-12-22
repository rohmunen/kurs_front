import { observer } from 'mobx-react-lite'
import { useContext, useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { getVacancies } from '../http/vacancyAPI';
import {Context} from "../index";
import { apply } from '../http/vacancyAPI';
import { getApplied } from '../http/vacancyAPI';
import {Spinner} from "react-bootstrap";
const VacanciesComponent = observer(() => {
    const {user} = useContext(Context)
    const {vacancyContext} = useContext(Context)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    useEffect(()=>{
        getVacancies().then(res => {
            if (res !== null) {
                console.log(res)
                vacancyContext.addVacancies(res)
            }
        }).finally(() => setLoading1(false))
        getApplied(localStorage.getItem('user_id')).then(res => {
            if (res !== null) {
                console.log(res)
                vacancyContext.setApplied(res)
            }
        }).finally(() => setLoading2(false))
    }, [])
    if (loading1 || loading2) {
        return (
            <Spinner animation={"grow"}/>
        )
    }
    return (
        <div>            
        {vacancyContext.vacancies.map(vacancy =>
            <div key={vacancy[0]} className="vacancy">
                <p>Название вакансии: {vacancy[1]}</p>
                {localStorage.getItem('role') == 1 ? 
                <Button disabled = {
                vacancyContext.applied.indexOf(parseInt(vacancy[0])) != -1}
                onClick={()=>{apply(localStorage.getItem('user_id'),vacancy[0]);
                vacancyContext.addApplied(vacancy[0])}}>
                    Откликнуться
                </Button>
                : 
                ""}
            </div>
        )}
        </div>
    );
})

 
export default VacanciesComponent;