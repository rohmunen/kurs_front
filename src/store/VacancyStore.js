import {makeAutoObservable} from 'mobx'

export default class VacancyStore {
    vacancies = []
    applied = []
    responded = []
    profiles = []
    ids = []
    constructor() { 
        makeAutoObservable(this)
    }

    addIds(id){
        this.ids.push(id)
        console.log(this.ids)
    }
    addResponded(vacancies){
        this.responded.push(vacancies)
        console.log(this.responded)
    }
    addProfiles(profiles){
        this.profiles.push(profiles)
    }
    addVacancies(vac) {
        this.clearVacancies()
        vac.forEach(element => {
            this.vacancies.push(element.vacancy.substring(1, element.vacancy.length - 1).split(','))
        })
    }
    clearVacancies() {
        this.vacancies = []
    }
    clearData() {
        this.ids = []
        this.responded = []
        this.profiles = []
    }

    setApplied(applied) {
        this.applied = applied
    }
    addApplied(applied) {
        console.log('bf',this.applied)
        this.applied.push(parseInt(applied))
        console.log('af',this.applied)
    }
    removeVacancy(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
}