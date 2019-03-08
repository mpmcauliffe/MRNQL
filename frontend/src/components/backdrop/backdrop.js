import React from 'react'
import './backdrop.css'


const Backdrop = ({ handleTurnOff }) => 
    <div className='backdrop' onClick={handleTurnOff} />


export default Backdrop
