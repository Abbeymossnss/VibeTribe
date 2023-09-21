import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEvents, getTickets } from "../../managers/TicketManager"
import { createTicket } from "../../managers/TicketManager"
import "./ticketform.css"

// gotta figure out how to import getEvents...for this ticket. create event state, useEffect to get event, then set state.!
export const TicketForm = (userId) => {
    const navigate = useNavigate()
    const [eventTicket, setEventTicket] = useState([])
    const [currentTicket, setCurrentTicket] = useState({
        title: "",
        issue: "",
        event: 0,


    })

    useEffect(() => {
        // todo: get the events, then set the state
        // fetch events from the server using getTickets function.
        getEvents().then(eventTickets => {
            setEventTicket(eventTickets)
        }).catch(error => {
            console.error(error)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the selected event ID is valid
        const selectedEventId = parseInt(currentTicket.event, 10);
        const validEventIds = eventTicket.map((event) => event.id);

        if (!validEventIds.includes(selectedEventId)) {
            console.error("Invalid event ID");
            return; // Prevent the POST request if the event ID is invalid
        }

        // Call the createTicket function to submit the ticket data to the server
        createTicket(currentTicket)
            .then(() => {
                // Redirect to the ticket list or show a success message
                navigate("/tickets");
            })
            .catch((error) => {
                console.error(error);
                // Handle errors. Show an error message to the user.
            });
    };


    const changeTicketState = (ticketEventClick) => {

        const newTicketState = { ...currentTicket }
        newTicketState[ticketEventClick.target.name] = ticketEventClick.target.value
        setCurrentTicket(newTicketState)
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm_title">Create Your Help Ticket:</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title"> Title Your Help Ticket: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentTicket.title}
                        onChange={changeTicketState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="issue">Describe Your Issue Here: </label>
                    <input type="text" name="issue" required autoFocus className="form-control"
                        value={currentTicket.issue}
                        onChange={changeTicketState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event"> Select Event in Crisis Mode: </label>
                    <select name="event" value={currentTicket.event} onChange={changeTicketState}>
                        <option value="" disabled>Select your event</option>
                        {eventTicket.map(event => (
                            <option key={event.id} value={event.id}>{event.title}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const ticket = {
                        title: currentTicket.title,
                        event: parseInt(currentTicket.event),
                        issue: currentTicket.issue,
                    }

                    // Send POST request to your API
                    createTicket(ticket)
                        .then(() => navigate("/tickets"))
                }}
                className="create-event-button">Create</button>

        </form>

    )




}







