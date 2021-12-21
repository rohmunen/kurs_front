import {makeAutoObservable} from 'mobx'

export default class VacancyStore {
    vacancies = []
    constructor() { 
        makeAutoObservable(this)
    }

    addVacancies(vac) {
        vac.forEach(element => {
            this.vacancies.push(element.vacancy.substring(1, element.vacancy.length - 1).split(','))
        })
    }

    removeVacancy(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
}