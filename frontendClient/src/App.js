import React, { useContext, useEffect, useState } from 'react';
// components and assets
import logo from './cookie.svg';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
import Profile from './components/Profile';
import CookieFail from './components/CookieFail';
import RequestBody from './components/RequestBody';
import AdminView from './components/AdminView';
// styling
import './App.scss';
// api calls
import { postIsLoggedIn } from './services/user';
import CookieSuccess from './components/CookieSuccess';
import { getRandomCookie } from './services/cookie';

const initialModeState = {
  theme: "light",
  setTheme: () => null
}

const initialLoggedInState = {
  loggedIn: false,
  setLoggedIn: () => null
}

export const ThemeContext = React.createContext(initialModeState);
export const LoggedInContext = React.createContext(initialLoggedInState);

const App = () => {
  const [themeDropDown, setThemeDropDrown] = useState(initialModeState.theme);
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState.loggedIn);

  useEffect(() => {
    const fetchLoggedIn = async() => {
      const response = await postIsLoggedIn();
      return response;
    }

    const response = fetchLoggedIn()
      .then((res)=> {
        if (res.status === 403) {
          console.log(res);
          console.log('forbidden, setting isLoggedIn to false')
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
        return res.json();
      })
      .then((data)=> {
        localStorage.setItem('kerberos', data['authData']['username']);
          
      })
      .catch(console.error);
        
  },[])

  const [cookieFail, setCookieFail] = useState(false);
  const [cookieSuccess, setCookieSuccess] = useState('');

  const handleCookie = async () => {
    console.log('clicked')
    return getRandomCookie(localStorage.getItem('kerberos'))
    .then((res) => {
      if (res.status !== 200) {
        setCookieFail(true);
      }
      return res.json();
    })
    .then((data) => {
      console.log(document.cookie);
      setCookieSuccess(document.cookie);
    })
  }

  return (
    <ThemeContext.Provider value={{themeDropDown, setThemeDropDrown}}>
      <LoggedInContext.Provider value ={{isLoggedIn, setIsLoggedIn}}>
      <div className={`theme--${themeDropDown}`}>
      <div className="App">
        <div className="top-navigation">
          <div className="auth-menu">
            <Auth /> <br />
            {isLoggedIn && <Profile />}
          </div>
          <ThemeToggle />
        </div>

      
        <header className="App-header">
          <a onClick={() => handleCookie()}><img src={logo} className="App-logo" alt="logo" /> </a>
          <CookieFail open={cookieFail} closeModal={setCookieFail}/>
          <CookieSuccess open={cookieSuccess} closeModal={setCookieSuccess}/>
          <h1> {isLoggedIn && `Welcome, ${localStorage.getItem('kerberos')}, to`} Cookies Simulator</h1>
          <div className='table'>
          <RequestBody />
          <br/> <br/>
          {isLoggedIn && <AdminView />}
          </div>
          <br/> <br/>
          {/* <p>
            <b>TODO: </b> <br/>
            <b>DONE</b> 1. Insert into User Interaction Table acts of retrieving cookies by a logged in user <br/>
            <b>DONE</b> 2. Create a DEFAULT admin in User Table upon DB seeding, AKA initial local setup, Username:admin, PWD:pleasechange <br/>
            &nbsp; 2.1 On initial log-in with username:admin, they are required to change the dummy password <br/>
            <b>DONE</b> 3. UI to edit username, password, associated email.
          </p> */}
          <a
            className="App-link"
            href="https://github.com/comp426-2022-fall/a99-Group34-team"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Code That Made Me
          </a>
        </header>
      </div>
    </div>
    </LoggedInContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
