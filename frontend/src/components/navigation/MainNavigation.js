import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../context/auth-context'
import './mainNavigation.css'


const MainNavigation = props => 
    <AuthContext.Consumer>
        {(context) =>  {
            return(
                <header className='main-navigation'>
                    <div className='main-navigation__logo'>
                        <h3>EasyEvent</h3>
                    </div>
                    <nav className='main-navigation__items'>
                        <ul>
                            {!context.token && <li><NavLink to='/Auth'>Authenticate</NavLink></li>}
                            <li>
                                <NavLink to='/events'>Events</NavLink>
                            </li>
                            {context.token && <li><NavLink to='/bookings'>Bookings</NavLink></li>}
                        </ul>
                    </nav>
                </header>
            )
        }}
    </AuthContext.Consumer>

export { MainNavigation }
