import React, { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "../../managers/TicketManager.js";
import { useNavigate, Link } from "react-router-dom";
import "./ticketlist.css";

export const TicketList = ({ isStaff, token }) => {
    const [tickets, setTickets] = useState([]);
    const [ticketIdToDelete, setTicketIdToDelete] = useState(null);
    const navigate = useNavigate();

    const listData = {
        title: "",
        issue: "",
        creator: 0,
        status: 0,
        volunteer: 0,
    };

    if (listData.status === null) {
        listData.status = 3;
    }

    const handleDeleteTicket = (ticketId) => {
        // Display a confirmation dialog (you can use window.confirm)
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this help ticket?"
        );

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

    console.log(isStaff);
    console.log(token)

    const userId = token ? token.user_id : null;

    return (
        <article className="tickets">
            {isStaff === false && ( // Conditionally render the "Create" button if not staff
                <button
                    className="create-ticket1-button"
                    onClick={() => {
                        navigate({ pathname: "/tickets/new" });
                    }}
                >
                    CREATE!
                </button>
            )}
            {tickets.map((ticket) => (
                <section key={`ticket--${ticket.id}`} className="ticket">
                    <div className="title">NAME OF CRISIS: {ticket.title} </div>
                    <div className="ticketEvent">EVENT IN CRISIS: {ticket.event.name}</div>
                    <div className="creator">
                        HOST IN CRISIS: {ticket.creator.full_name}</div>
                    <div className="issue">CRISIS DETAILS: {ticket.issue}</div>
                    {ticket.status ? (
                        <div className="status">TICKET STATUS: {ticket.status.type}</div>
                    ) : (
                        <div className="status">TICKET STATUS: Pending Volunteer Assignment</div>
                    )}
                    {ticket.volunteer ? (
                        <div className="volunteer">VOLUNTEER PARTY SAVER: {ticket.volunteer.full_name}</div>
                    ) : (
                        <div className="volunteer">VOLUNTEER PARTY SAVER: Volunteer Not Assigned Yet...</div>
                    )}
                    <div>
                        <Link to={`/tickets/${ticket.id}`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>
                        {/* Conditionally render the delete button for the creator of the ticket */}
                        {userId=== ticket.creator.id && (
                            <button
                                onClick={() => handleDeleteTicket(ticket.id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </section>
            ))}
        </article>
    );
};
