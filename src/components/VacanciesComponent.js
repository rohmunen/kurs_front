import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react';
import { getVacancies } from '../http/vacancyAPI';
import {Context} from "../index";

const VacanciesComponent = observer(() => {
    const {vacancyContext} = useContext(Context)
    useEffect(()=>{
        getVacancies().then(res => {
            if (res !== null) {
                console.log(res)
                vacancyContext.addVacancies(res)
            }
            console.log(vacancyContext)
        })
    }, [])
    return (
        <div>            
        {vacancyContext.vacancies.map(vacancy =>
            <div key={vacancy[0]} className="vacancy">
                <p>{vacancy[1]}</p>
            </div>
        )}
        </div>
    );
})

 
export default VacanciesComponent;