import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"

export const EventForm = () => {
 const navigate = useNavigate()
 const [eventTag, setEventTag] = useState([])

 const [currentEvent, setCurrentEvent] = useState({
    date: "",
    time: "",
    details: "",
    location: "",
    tags: setEventTag

 })




}