import React, { useContext, useEffect, useState } from 'react';
// components and assets
import logo from './logo.svg';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
import RequestBody from './components/RequestBody';
// styling
import './App.scss';
// api calls
import { postIsLoggedIn } from './services/user';


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

  return (
    <ThemeContext.Provider value={{themeDropDown, setThemeDropDrown}}>
      <LoggedInContext.Provider value ={{isLoggedIn, setIsLoggedIn}}>
      <div className={`theme--${themeDropDown}`}>
      <div className="App">
        <div className="top-navigation">
          <Auth />
          <ThemeToggle />
        </div>
      
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Request Body</p>
          <RequestBody />
          <p>
            <b>TODO: </b> <br/>
            1. Interface for httpbin API with options (POST, GET; Request Param and Body, Headers) <br/>
            2. 
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
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
