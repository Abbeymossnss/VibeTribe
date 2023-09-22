import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createTicket, getTickets } from "../../managers/TicketManager"
import { getEvents } from "../../managers/EventManager"
import "./ticketform.css"

export const UpdateTicket = () => {

    const [currentTicket, setCurrentTicket] = useState({
        title: "",
        issue: "",
        status: 0,
        volunteer: 0


    })

    const { ticketId } = useParams()
    const navigate = useNavigate()


    const updateTicketState = (eventClick) => {

        const editTicketState = { ...currentTicket }
        editTicketState[eventClick.target.name] = eventClick.target.value
        setCurrentTicket(editTicketState)
    }
    const checkStaff = JSON.parse(localStorage.getItem("is_staff"));
    console.log(checkStaff);

    return (
        <>
                <form className="updateTicketForm">
                    <h2 className="updateTicket_header"> Edit Your Help Ticket Details!</h2>
                    <fieldset>
                        <div className="updateForm-group">
                            <label htmlFor="status">Update Your Issue Details: </label>
                            <input type="text" name="issue" required autoFocus className="form-control"
                                value={currentTicket.issue}
                                onChange={updateTicketState}
                            />           
                        </div>

                    </fieldset>
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const updatedTicket = {
                            id: ticketId,
                            issue: currentTicket.issue,

                            // use this instead of currentEvent.tags.. because u dont want an object.


                        }

                        // Send POST request to your API
                        UpdateTicket(updatedTicket)
                            .then(() => navigate("/tickets"))
                    }
                    }
                    className="btn btn-primary">Submit Changes!</button>

            </form>
        </>
    )
}
export default UpdateTicket