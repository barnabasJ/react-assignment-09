import * as  React from 'react'
import { 
  BrowserRouter as Router ,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {IntlProvider} from 'react-intl';
import * as ReactDOM from 'react-dom'
import { Numbers } from './numbers';
import { Dates } from './dates';
import { Texts } from './texts';

const messages = {
  en: {
     greeting: "Hello {gender,select,male{Mr.}female{Ms.}other{}} {name}! You are {age} {age,plural,one{year}other{years}} old.",
     date: "La fecha es {d, date}."
  },
  de: {
     hw: "Hallo Welt!",
     greeting: "Hallo {gender,select,male{Herr}female{Frau}other{}} {name}! Sie sind {age} {age,plural,one{Jahr}other{Jahre}} alt.",
     date: "Das Datum ist {d, date}."
  }
};

const LOCALE_KEY = 'react-intl-locale'

const App = () => { 
  const [locale, setLocale] = React.useState('de')

  React.useEffect(() => {
    const l = localStorage.getItem(LOCALE_KEY)
    if (l) {
      setLocale(l)
    }
  }, [])


  const setAndSaveLocale = React.useCallback((e) => {
    const { value } = e.target
    localStorage.setItem(LOCALE_KEY, value)
    setLocale(value)
  }, [setLocale])


  return ( 
  <Router>
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Texts</Link>
            </li>
            <li>
              <Link to="/dates">Dates</Link>
            </li>
            <li>
              <Link to="/numbers">Numbers</Link>
            </li>
          </ul>
        </nav>
      <select id="locale" value={locale} onChange={setAndSaveLocale}>
          <option value="en">en</option>
          <option value="de">de</option>
      </select>
        <Switch>
          <Route path="/numbers">
            <Numbers/>
          </Route>
          <Route path="/dates">
            <Dates/>
          </Route>
          <Route path="/">
            <Texts />
          </Route>
        </Switch>
      </div>
    </IntlProvider>
  </Router>
 )
}

const render = () => {
  ReactDOM.render(
    <>
      <h1>React I18n</h1>
      <App/>
    </>,
    document.getElementById('root')
  )
}

render()