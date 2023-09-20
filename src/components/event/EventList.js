import React, { useEffect, useState, } from "react";
import { getEvents, deleteEvent } from "../../managers/EventManager.js";
import { useNavigate, Link } from "react-router-dom";
import "./EventList.css"


// export event list function.
// declare navigate for useNav
// create state for events
// use effect to get the data for events
// return jsx for event objects

// for tags.. import tags from tag manager. usestate..

export const EventList = ({isStaff}) => {
  const [events, setEvents] = useState([]);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);
  const navigate = useNavigate()

    // Function to format time as AM/PM
    const formatTime = (time) => {
        const timeParts = time.split(":");
        const hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    const handleDeleteEvent = (eventId) => {
        // Display a confirmation dialog (you can use window.confirm)
        const confirmDelete = window.confirm("Are you sure you want to delete this event?");

        if (confirmDelete) {
            // Send a DELETE request to delete the event
            deleteEvent(eventId)
                .then((response) => {
                    if (response.ok) {
                        // Remove the deleted event from the state
                        setEvents(events.filter((event) => event.id !== eventId));
                    } else {
                        console.error("Failed to delete event");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting event:", error);
                });
        }
    };

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);





console.log(isStaff)

    return (
        <article className="events">
            {isStaff===false && ( // Conditionally render the "Create" button if not staff
                <button
                    className="btn btn-2 btn-sep icon-create create-event-button"
                    onClick={() => {
                        navigate({ pathname: "/events/new" });
                    }}
                >
                    CREATE!
                </button>
            )}
            {events.map((event) => (
                <section key={`event--${event.id}`} className="event">
                    <div className="host">WHO? Hosted By: {event.host.full_name}</div>
                    <div className="name">WHAT? Party Name: {event.name}</div>
                    <div className="date">WHEN? {event.date}</div>
                    <div className="time">BUT LIKE, SRZLY, WHEN? {formatTime(event.time)}</div>
                    <div className="location">WHERE? Party Location: {event.location}</div>
                    <div className="details">WHY? Party Deets: {event.details}</div>
                    <div className="tags">
                        {event.tags.map((tag) => (
                            <span className="tag" key={tag.id}>
                                {tag.label}
                            </span>
                        ))}
                         {isStaff===false &&  ( // Conditionally render the "Edit" and "Delete" buttons if not staff
                            <>
                                {/* Add an "Edit" button that navigates to the edit event form */}
                                <Link to={`/events/${event.id}`}>
                                    <button>Edit</button>
                                </Link>
                                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                            </>
                        )}
                    </div>
                </section>
            ))}
        </article>
    );

};
