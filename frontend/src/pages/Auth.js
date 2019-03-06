import React, { Component } from 'react'
import './auth.css'


class AuthPage extends Component {
    constructor(props) {
        super(props)
        this.emailElement = React.createRef()
        this.passwordElement = React.createRef()
    }
    submitHandler = e => {
        e.preventDefault()
        const email = this.emailElement.current.value
        const password = this.passwordElement.current.value

        if(email.trim().length === 0 || password.trim().length === 0) {
            return
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }
            `
        }

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    render() {
        return (
            <form className='auth-form' onSubmit={this.submitHandler}>
                <div className='form-control'>
                    <label htmlFor='email'>email</label>
                    <input type='email' id='email' ref={this.emailElement} />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>password</label>
                    <input type='password' id='password' ref={this.passwordElement} />
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
