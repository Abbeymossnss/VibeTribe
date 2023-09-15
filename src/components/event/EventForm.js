import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getTags } from "../../managers/TagManager"

export const EventForm = () => {
 const navigate = useNavigate()
 const [eventTag, setEventTag] = useState([])

 const [currentEvent, setCurrentEvent] = useState({
    date: "",
    time: "",
    details: "",
    location: "",
    tags: []

 })
    useEffect(() => {
        // TODO: Get the tags, then set the state
        // Fetch tags from the server using getTags function
        getTags().then(eventTags => {
            setEventTag(eventTags)
        }).catch(error => {
            console.error(error)
        });
    }, [])

    const handleTagSelection = (selectedTagIds) => {
        // Map the selected tag IDs to tag objects and update the state
        const selectedTags = eventTag.filter((tag) => selectedTagIds.includes(tag.id));
        setCurrentEvent((prevEvent) => ({
            ...prevEvent,
            tags: selectedTags,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the createEvent function to submit the event data to the server
        createEvent(currentEvent)
            .then(() => {
                // Redirect to the event list or show a success message
                navigate("/events");
            })
            .catch((error) => {
                console.error(error);
                // Handle errors, e.g., show an error message to the user
            });
    };
    return (
        <div>
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={currentEvent.date}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, date: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={currentEvent.time}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, time: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={currentEvent.location}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, location: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="details">Details:</label>
                    <textarea
                        id="details"
                        name="details"
                        value={currentEvent.details}
                        onChange={(e) =>
                            setCurrentEvent({ ...currentEvent, details: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <p>Tags:</p>
                    {eventTag.map((tag) => (
                        <label key={tag.id}>
                            <input
                                type="checkbox"
                                value={tag.id}
                                onChange={(e) => {
                                    const selectedTagIds = e.target.checked
                                        ? [...currentEvent.tags, parseInt(e.target.value)]
                                        : currentEvent.tags.filter(
                                            (id) => id !== parseInt(e.target.value)
                                        );
                                    handleTagSelection(selectedTagIds);
                                }}
                            />
                            {tag.label}
                        </label>
                    ))}
                </div>
                <div>
                    <button type="submit">Create Event</button>
                </div>
            </form>
        </div>
    );
};













