import Auth from "./pages/Auth"
import Vacancies from "./pages/Vacancies"
import {YOUR_VACANCIES_ROUTE, CHECK_PROFILE_ROUTE, PROFILE_ROUTE, VACANCY_RESPONSES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, COMPLETE_ROUTE, VACANCIES_ROUTE, CREACTE_VACANCIES_ROUTE, VACANCY_ROUTE} from "./utils/consts"
import Home from "./pages/Home"
import CompleteProfile from "./pages/CompleteProfile"
import CreateVacancy from "./pages/CreateVacancy"
import Vacancy from "./pages/Vacancy"
import VacancyResponses from "./pages/VacancyResponses"
import Profile from "./pages/Profile"
import CheckProfile from "./pages/CheckProfile"
import YourVacanciesComponent from "./components/YourVacanciesComponent"
import YourVacancies from "./pages/YourVacancies"

export const authRoutes = [
    {
        path: YOUR_VACANCIES_ROUTE,
        Component: YourVacancies
    },
    {
        path: CHECK_PROFILE_ROUTE,
        Component: CheckProfile
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
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
    },
    {
        path: VACANCY_RESPONSES_ROUTE,
        Component: VacancyResponses
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