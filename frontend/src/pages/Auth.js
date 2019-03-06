import React, { Component } from 'react'
import './auth.css'


class AuthPage extends Component {
    render() {
        return (
            <form className='auth-form'>
                <div className='form-control'>
                    <label htmlFor='email'>email</label>
                    <input type='email' id='email' />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>password</label>
                    <input type='password' id='password' />
                </div>
                <div className='form-actions'>
                    <button type='submit'>Submit</button>
                    <button type='button'>switch to Signup</button>
                </div>
            </form>
        ) 

    }
}


export default AuthPage
