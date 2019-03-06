import React from 'react'
import { NavLink } from 'react-router-dom'
import './mainNavigation.css'


const MainNavigation = props => 
    <header className='main-navigation'>
        <div className='main-navigation__logo'>
            <h3>EasyEvent</h3>
        </div>
        <nav className='main-navigation__items'>
            <ul>
                <li>
                    <NavLink to='/Auth'>Authenticate</NavLink>
                </li>
                <li>
                    <NavLink to='/events'>Events</NavLink>
                </li>
                <li>
                    <NavLink to='/bookings'>Bookings</NavLink>
                </li>
            </ul>
        </nav>
    </header>
    

export { MainNavigation }
