import React, { Component, Fragment } from 'react'
import { 
    BrowserRouter, 
    Redirect, 
    Route, 
    Switch,
} from 'react-router-dom' 
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import { MainNavigation, } from './components/navigation/MainNavigation'
import './App.css'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <MainNavigation />
                    <main className='main-content'>
                        <Switch>
                            <Redirect from='/' to='/auth' exact />
                            <Route path='/auth' component={AuthPage} />
                            <Route path='/events' component={EventsPage} />
                            <Route path='/bookings' component={BookingsPage} />
                        </Switch>
                    </main>
                </Fragment>
            </BrowserRouter>
        )
    }
}


export default App;
