import React from 'react'
import './eventItem.css'


const EventItem = props => 
    <li key={props.eventId} className='events__list-item'>
        <div>
            <h1>{props.title}</h1>
            <h2>$19.99</h2>
        </div>
        <div>
            {props.userId === props.creatorId 
                ?   (
                    <p>You own this event</p>
                ) : (
                    <button className='btn'>view details</button>
                )
            }
        </div>
    </li>


export { EventItem }
