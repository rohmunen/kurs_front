import React, {createContext} from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import VacancyStore from './store/VacancyStore';
import UserStore from './store/UserStore';
import './index.css';
export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value = {{
    user: new UserStore(),
    vacancyContext: new VacancyStore()
  }}>
         <App/>
  </Context.Provider>,
  document.getElementById('root')
);
