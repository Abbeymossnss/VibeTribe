import React, { useEffect, useState, } from "react";
import { getTickets, deleteTicket } from "../../managers/TicketManager.js";
import { useNavigate, Link } from "react-router-dom";

export const TicketList = ({ isStaff }) => {
    const [tickets, setTickets] = useState([]);
    const [ticketIdToDelete, setTicketIdToDelete] = useState(null);
    const navigate = useNavigate()

    const handleDeleteTicket = (ticketId) => {
        // Display a confirmation dialog (you can use window.confirm)
        const confirmDelete = window.confirm("Are you sure you want to delete this help ticket?");

        if (confirmDelete) {
            // Send a DELETE request to delete the event
            deleteTicket(ticketId)
                .then((response) => {
                    if (response.ok) {
                        // Remove the deleted event from the state
                        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
                    } else {
                        console.error("Failed to delete help ticket!");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting help ticket:", error);
                });
        }
    };

    useEffect(() => {
        getTickets().then((data) => setTickets(data));
    }, []);

    console.log(isStaff)

    return (
        <article className="tickets">
            {/* {isStaff === false && ( // Conditionally render the "Create" button if not staff
                <button
                    className="btn btn-2 btn-sep icon-create create-event-button"
                    onClick={() => {
                        navigate({ pathname: "/tickets/new" });
                    }}
                >
                    CREATE HELP TICKET
                </button>
            )} */}
            {tickets.map((ticket) => (
                <section key={`ticket--${ticket.id}`} className = "ticket">
                    <div className="title">HELP TICKET TITLE: {ticket.title} </div>
                    <div className="issue">ISSUE DETAILS: {ticket.issue}</div>
                    <div className="creator">HOST THAT NEEDS HELP:{ticket.creator.full_name}</div>
                    <div classname="status">HELP TICKET STATUS:{ticket.status.type}</div>


                </section>
        
        ))}



























        </article>

    )

}