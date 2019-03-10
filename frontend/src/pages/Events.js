import React, { Component, Fragment, } from 'react'
import AuthContext from '../context/auth-context'
import { EventList } from '../components/events'
import Modal from '../components/modal/Modal'
import Backdrop from '../components/backdrop/backdrop'
import Spinner from '../components/spinner/Spinner'
import './events.css'


class EventsPage extends Component {
    state = {
        isOpen: false,
        events: [],
        isLoading: false,
        selectedEvent: null,
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
            this.setState(prevState => {
                const updatedEvents = [...prevState.events]
                updatedEvents.push({
                    _id: resData.data.createEvent._id,
                    title: resData.data.createEvent.title,
                    description: resData.data.createEvent.description, 
                    date: resData.data.createEvent.date,
                    price: resData.data.createEvent.price,
                    creator: {
                        _id: this.context.userId,
                    },
                })

                return { events: updatedEvents }
            })
        }).catch(err => { console.log(err) })
        
        this.handleModalToggle()
    }


    fetchEvents = () => {
        this.setState({ isLoading: true })

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
            this.setState({ events: events, isLoading: false })
        }).catch(err => { 
            console.log(err) 
            this.setState({ isLoading: false })
        })
    }


    handleBookEvent = () => {
        const requestBody = {
            query: `
                mutation {
                    bookEvent(eventId: "${this.state.selectedEvent._id}") {
                        _id
                        createdAt
                        updatedAt
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
            console.log(resData)
        }).catch(err => { 
            console.log(err) 
            this.setState({ isLoading: false })
        })
    }


    handleViewDetails = eventId => {
        this.setState(prevState => {
            const selectedEvent = prevState.events.find(e => e._id === eventId)

            return { selectedEvent: selectedEvent }
        })
    }
    

    handleModalToggle = () => {
        if(this.state.selectedEvent) {
            this.setState({ selectedEvent: null })
        } else {
            this.setState(prevState => {
                return {
                    isOpen: !prevState.isOpen,
                }
            })
        }
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
                            onConfirm={this.handleBookEvent}
                            confirmText='Confirm'
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

                {this.state.selectedEvent && 
                    <Fragment>
                        <Backdrop handleTurnOff={this.handleModalToggle} />
                        <Modal 
                            title={this.state.selectedEvent.title} 
                            canCancel 
                            canConfirm
                            handleTurnOff={this.handleModalToggle}
                            onConfirm={this.handleConfirm}
                            confirmText='Book'
                        >
                            <h2>${this.state.selectedEvent.price} &#8211; {this.state.selectedEvent.date}</h2>
                            <p>{this.state.selectedEvent.description}</p>
                        </Modal>
                    </Fragment>
                }

                {this.context.token && 
                    <div className='events-control'>
                        <p>Share your own Events!</p>
                        <button className='btn' onClick={this.handleModalToggle}>Create Event</button>
                    </div>
                }

                {this.state.isLoading 
                    ?   (
                        <Spinner />
                    ) : (
                        <EventList 
                            events={this.state.events} 
                            authUserId={this.context.userId}
                            onViewDetail={this.handleViewDetails}
                        />
                    )   
                }
            </Fragment>
        )
    }
}


export default EventsPage
