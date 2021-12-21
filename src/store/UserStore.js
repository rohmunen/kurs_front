import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isComplete = false
        this._role = 0
        makeAutoObservable(this)
    }

    setIsComplete(bool) {
        this._isComplete = bool
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user){ 
        this._user = user
    }

    setRole(role){
        this._role = role
    }

    get role(){
        return this._role
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
    get isComplete() {
        return this._isComplete
    }


}