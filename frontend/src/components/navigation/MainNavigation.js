import React from 'react'
import { NavLink } from 'react-router-dom'


const MainNavigation = props => 
    <header>
        <div className='main-navigation__logo'>
            <h4>Navbar</h4>
        </div>
        <nav className='main-navigation__item'>
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
