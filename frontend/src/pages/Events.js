import React, { Component, createRef, Fragment, } from 'react'
import Modal from '../components/modal/Modal'
import Backdrop from '../components/backdrop/backdrop'
import './events.css'


class EventsPage extends Component {
    state = {
        isOpen: false,
    }
    constructor(props) {
        super(props)
        this.titleElement = createRef()
        this.priceElement = createRef()
        this.dateElement = createRef()
        this.descriptionElement = createRef()
    }

    handleModalToggle = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen,
            }
        })
    }
    handleConfirm = () => {
        const title = this.titleElement,
              price = this.priceElement,
               date = this.dateElement,
         desciption = this.descriptionElement;

        

        this.handleModalToggle()
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
                                    <input type='text' id='title' ref={this.titleElement} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='price'>price</label>
                                    <input type='number' id='price' ref={this.priceElement} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='date'>date</label>
                                    <input type='date' id='date' ref={this.dateElement} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='description'>description</label>
                                    <textarea id='description' rows='4' ref={this.descriptionElement} />
                                </div>
                            </form>
                        </Modal>
                    </Fragment>
                }
                <div className='events-control'>
                    <p>Share your own Events!</p>
                    <button className='btn' onClick={this.handleModalToggle}>Create Event</button>
                </div>
            </Fragment>

        )
    }
}


export default EventsPage
