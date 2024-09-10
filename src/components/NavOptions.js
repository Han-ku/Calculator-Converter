import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const NavOptions = () => {

    const location = useLocation()
    const isCalculator = location.pathname === '/'
    const navOptionsClass = isCalculator ? 'nav-options-calculator' : 'nav-options-converter'

  return (
    <div id="nav-options" className={navOptionsClass}>
        <span>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-span' : '')} end>Calculator</NavLink>
        </span>
        <span>
            <NavLink to="/converter" className={({ isActive }) => (isActive ? 'active-span' : '')}>Converter</NavLink>
        </span>
    </div>
  )
}

export default NavOptions