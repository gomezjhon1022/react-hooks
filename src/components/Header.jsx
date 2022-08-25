import React, { useState , useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {theme, setTheme } = useContext(ThemeContext);
  const handleClick = () => {
    setDarkMode(!darkMode);
    setTheme(!theme);
  }
  return (
    <div className={theme?`header-dark`:`header-light`}>
      {theme ? <h1 className='dark title'>Rick and Morty Characters</h1>: <h1 className='light title'>Rick and Morty Characters</h1>}
      <button type='button' onClick={handleClick}
      className={theme?'button-dark button':'button-light button'}
      >{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
    </div>
  )
}

export default Header;