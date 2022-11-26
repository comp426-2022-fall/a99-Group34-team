import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import Toggle from 'react-toggle';

const ThemeToggle = () => {
    const {themeDropDown, setThemeDropDrown} = useContext(ThemeContext)
    return (
        <div className="Theme-toggle">
        <label>
          <span>Light</span>
          <Toggle
            defaultChecked={true}
            icons={{
              checked: <BsFillSunFill />,
              unchecked: <BsFillMoonFill/>,
            }}
            onChange={() => setThemeDropDrown((themeDropDown=="light"?"dark":"light"))} />
          <span>Dark</span>
        </label>
        </div>
    )
}

export default ThemeToggle;