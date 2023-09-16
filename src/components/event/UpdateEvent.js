
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { EditEvent, getSingleEvent } from "../../managers/EventManager"
import { getTags } from "../../managers/TagManager"
import "./UpdateEvent.css"
// make a put request in managers. setState to add tags. update event function. eventhandler.
// to get the tags autofilled for selected event and enable the boxes to selected:
// initialize state variable for selectedTags, to keep track of the selected tags.
// update the useEffect hook to populate 'selectedTags' with the tags associated with selected event.
// modify the checkbox rendering to set the 'checked' attribute based on whether a tag is in 'selectedTags'
//  handle the checkbox changed to update 'selectedTags' when user makes selections.

export const UpdateEvent = ({isStaff}) => {
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

    const { eventId }  = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch tags and event data
        Promise.all([getTags(), getSingleEvent(eventId)])
            .then(([tagsData, eventData]) => {
                setEventTag(tagsData);
                setCurrentEvent(eventData);
                setSelectedTags(eventData.tags.map(tag => tag.id)); // Initialize selectedTags with tag IDs
            })
            .catch(error => {
                console.error(error);
            });
    }, [eventId]);

    
    const updateEventState = (eventClick) => {
            
            const editEventState = { ...currentEvent }
            editEventState[eventClick.target.name] = eventClick.target.value
            setCurrentEvent(editEventState)
            
        }

        // this function handles tag selection..
    const handleTagSelection = (tagId) => {
        setSelectedTags(prevSelectedTags => {
            if (prevSelectedTags.includes(tagId)){
                // if the tag is already selected, remove it
                return prevSelectedTags.filter(id => id !== tagId)
            } else {
                return [...prevSelectedTags,tagId]
            }
        })
    }


const checkStaff = JSON.parse(localStorage.getItem("is_staff"));
console.log(checkStaff);

    return (
        <>
            {checkStaff===true && (
                <div>
                    <p>You're a volunteer, you really shouldn't meddle.</p>
                    {/* You can render a message or redirect them to another page */}
                </div>
            )}
            {checkStaff===false && (
        <form className="updateEventForm">
            <h2 className="updateEvent_title"> Edit Your Event</h2>
            <fieldset>
                <div className="updateForm-group">
                    <label htmlFor="name">Edit Event Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentEvent.name}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="updateForm-group">
                    <label htmlFor="date">Edit Event Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="updateForm-group">
                    <label htmlFor="time">Edit Event Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset> 
            <fieldset>
                <div className="updateForm-group">
                    <label htmlFor="location">Edit Event Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="updateForm-group">
                    <label htmlFor="details">Edit Party Deets: </label>
                    <input type="text" name="details" required autoFocus className="form-control"
                        value={currentEvent.details}
                        onChange={updateEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="updateForm-group">
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

                    const updatedEvent = {
                        id: eventId,
                        name: currentEvent.name,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        details: currentEvent.details,
                        location: currentEvent.location,
                        tags: selectedTags, 
                        // use this instead of currentEvent.tags.. because u dont want an object.


                    }

                    // Send POST request to your API
                   EditEvent(updatedEvent)
                        .then(() => navigate("/events"))
                }
            }
            className="btn btn-primary">Submit Changes!</button>

</form>
)}
</>
    )
}
export default UpdateEvent;
    
{/* line 121 checks if tag is selected
122 handles the checkbox change */}


    
    