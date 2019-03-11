import React from 'react'
import './bookingList.css'


const BookingList = props =>
    <ul className='bookings__list'>
        {props.bookings.map(booking => {
            return (
                <li key={booking._id} className='bookings__item'>
                    <div className='bookings__item-data'>
                        {booking.event.title} 
                        {' '}&#8211;{' '} 
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                    <div className='bookings__item-action'>
                        <button onClick={props.onDelete.bind(this, booking._id)} className='btn'>Cancel</button>
                    </div>
                </li>
            )
        })}
    </ul>


export default BookingList
