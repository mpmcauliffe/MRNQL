import React, { Component, Fragment, } from 'react'
import AuthContext from '../context/auth-context'
import { EventList } from '../components/events'
import Modal from '../components/modal/Modal'
import Backdrop from '../components/backdrop/backdrop'
import './events.css'


class EventsPage extends Component {
    state = {
        isOpen: false,
        events: [],
    }
    constructor(props) {
        super(props)
        this.titleElement       = React.createRef()
        this.priceElement       = React.createRef()
        this.dateElement        = React.createRef()
        this.descriptionElement = React.createRef()
    }
    static contextType = AuthContext


    componentDidMount() {
        this.fetchEvents()
    }


    handleModalToggle = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen,
            }
        })
    }
    handleConfirm = () => {
        const title      = this.titleElement.current.value
        const price      = +this.priceElement.current.value
        const date       = this.dateElement.current.value
        const description = this.descriptionElement.current.value

        if(
            title.trim().length === 0 || 
            price <= 0 || 
            date.trim().length === 0 || 
            description.trim().length === 0
        ) { return }

        //const event = { title, price, date, description }
        //console.log(event)

        const requestBody = {
            query: `
                mutation {
                    createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
                        _id
                        title
                        description
                        date
                        price
                        creator {
                            _id
                            email
                        }
                    }
                }`
        }
        const token = this.context.token

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }

            return res.json()
        }).then(resData => {
            this.fetchEvents()
        }).catch(err => { console.log(err) })
        
        this.handleModalToggle()
    }
    fetchEvents = () => {
        const requestBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        description
                        date
                        price
                        creator {
                            _id
                            email
                        }
                    }
                }`
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
            const events = resData.data.events
            this.setState({ events: events })
        }).catch(err => { console.log(err) })
    }


    render() {
        return (
            <Fragment>
                {this.state.isOpen &&
                    <Fragment>
                        <Backdrop handleTurnOff={this.handleModalToggle} />
                        <Modal 
                            title='Add Event' 
                            canCancel 
                            canConfirm
                            handleTurnOff={this.handleModalToggle}
                            onConfirm={this.handleConfirm}
                        >
                            <form>
                                <div className='form-control'>
                                    <label htmlFor='title'>title</label>
                                    <input type='text' id='title' ref={this.titleElement}></input>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='price'>price</label>
                                    <input type='number' id='price' ref={this.priceElement}></input>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='date'>date</label>
                                    <input type='datetime-local' id='date' ref={this.dateElement}></input>
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='description'>description</label>
                                    <textarea id='description' rows='4' ref={this.descriptionElement}></textarea>
                                </div>
                            </form>
                        </Modal>
                    </Fragment>
                }

                {this.context.token && 
                    <div className='events-control'>
                        <p>Share your own Events!</p>
                        <button className='btn' onClick={this.handleModalToggle}>Create Event</button>
                    </div>
                }

                <EventList 
                    events={this.state.events} 
                    authUserId={this.context.userId} 
                />
            </Fragment>
        )
    }
}


export default EventsPage
