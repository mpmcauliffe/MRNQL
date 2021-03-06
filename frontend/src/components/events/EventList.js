import React from 'react'
import { EventItem } from '../events'
import './eventList.css'


const EventList = props => {
    const events = props.events.map(event => {
        return <EventItem 
                    key={event._id} 
                    eventId={event._id} 
                    title={event.title} 
                    price={event.price}
                    date={event.date}
                    onDetail={props.onViewDetail}
                    userId={props.authUserId}
                    creatorId={event.creator._id}
               />  
    })
    return <ul className='event__list'>{events}</ul>
}


export { EventList }
