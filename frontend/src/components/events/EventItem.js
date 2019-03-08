import React from 'react'
import './eventItem.css'


const EventItem = props => 
    <li key={props.eventId} className='events__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>${props.price} &#8211; {new Date(props.date).toLocaleDateString()}</h2>
        </div>
        <div>
            {props.userId === props.creatorId 
                ?   (
                    <p>You own this event</p>
                ) : (
                    <button className='btn' onClick={props.onDetail.bind(props.eventId)}>view details</button>
                )
            }
        </div>
    </li>


export { EventItem }
