import Auth from "./pages/Auth"
import Vacancies from "./pages/Vacancies"
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, COMPLETE_ROUTE, VACANCIES_ROUTE, CREACTE_VACANCIES_ROUTE, VACANCY_ROUTE} from "./utils/consts"
import Home from "./pages/Home"
import CompleteProfile from "./pages/CompleteProfile"
import CreateVacancy from "./pages/CreateVacancy"
import Vacancy from "./pages/Vacancy"

export const authRoutes = [
    {
        path: COMPLETE_ROUTE,
        Component: CompleteProfile
    },
    {
        path: VACANCIES_ROUTE,
        Component: Vacancies
    },
    {
        path: CREACTE_VACANCIES_ROUTE,
        Component: CreateVacancy
    },
    {
        path: VACANCY_ROUTE,
        Component: Vacancy
    }
]
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
]