import React, { Component } from 'react'
import AuthContext from '../context/auth-context'
import './auth.css'


class AuthPage extends Component {
    state = {
        isLogin: true,
    }
    static contextType = AuthContext

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

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }`
        }

        if(!this.state.isLogin) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}) {
                            _id
                            email
                        }
                    }`
            }
        }

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }

            return res.json()
        }).then(resData => {
            if(resData.data.login.token) {
                this.context.login(
                    resData.data.login.token, 
                    resData.data.login.userId, 
                    resData.data.login.tokenExpiration
                )
            }
        }).catch(err => { console.log(err) })
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin,
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
                    <button type='button' onClick={this.switchModeHandler}>
                        {this.state.isLogin ? 'switch to Signup' : 'switch to Login'}
                    </button>
                </div>
            </form>
        ) 

    }
}


export default AuthPage
