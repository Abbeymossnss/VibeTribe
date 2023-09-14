import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"

// export event list function.
// declare navigate for useNav
// create state for events
// use effect to get the data for events
// return jsx for event objects

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const navigate = useNavigate

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [] )

    return (
        <article className="events">
            {<button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Create a New Party Event!</button>}
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="host">WHO? Hosted By: {event.host.full_name}</div>
                        <div className="name">WHAT? Party Name: {event.name}</div>
                        <div className="date">WHEN? {event.date}</div>
                        <div className="time">WHEN?: {event.time}</div>
                        <div className="location">WHERE? Party Location: {event.location}</div>
                        <div className="details">WHY? Party Deets:{event.details}</div>
                        <div className="tags">#HASHTAGS </div>
                        
                    </section>


                })


            }





        </article>
    )





























}

