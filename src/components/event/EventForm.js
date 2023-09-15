import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getTags } from "../../managers/TagManager"
import "./EventForm.css"

export const EventForm = () => {
 const navigate = useNavigate()
 const [eventTag, setEventTag] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);

 const [currentEvent, setCurrentEvent] = useState({
    name: "",
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

    const handleTagSelection = (tagId) => {
    // Check if the selected tagId is already in selectedTags
    if (selectedTags.includes(tagId)) {
        // If it's included, remove it
        setSelectedTags(prevSelectedTags =>
        prevSelectedTags.filter(id => id !== tagId)
        );
    } else {
        // If it's not included, add it
        setSelectedTags(prevSelectedTags => [...prevSelectedTags, tagId]);
    }

    // Update the currentEvent tags with the selectedTags
    setCurrentEvent(prevEvent => ({
        ...prevEvent,
        tags: selectedTags
    }));
    };

    // ...

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

    const changeEventState = (eventClick) => {

        const newEventState = { ...currentEvent }
        newEventState[eventClick.target.name] = eventClick.target.value
        setCurrentEvent(newEventState)
    }



    return (
        <form className="eventForm">
            <h2 className="eventForm_title">Register Your Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"> Name Your Event: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of New Event: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="time">Time of New Event: </label>
                        <input type="time" name="time" required autoFocus className="form-control"
                            value={currentEvent.time}
                            onChange={changeEventState}
                            />
                    </div>
                </fieldset>
                            <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location: </label>
                        <input type="text" name="location" required autoFocus className="form-control"
                            value={currentEvent.location}
                            onChange={changeEventState}
                            />
                    </div>
                </fieldset>
                            <fieldset>
                <div className="form-group">
                    <label htmlFor="details"> Party Details: </label>
                    <input type="text" name="details" required autoFocus className="form-control"
                        value={currentEvent.details}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
                  <fieldset>
        <div className="form-group">
          <label>Tags:</label>
          {eventTag.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagSelection(tag.id)}
              />
              <label htmlFor={`tag-${tag.id}`}>{tag.label}</label>
            </div>
          ))}
        </div>
      </fieldset>
                 <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        name: currentEvent.name,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        details: currentEvent.details,
                        location: currentEvent.location,
                        tags: currentEvent.tags,


                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>

            </form>

)
};













