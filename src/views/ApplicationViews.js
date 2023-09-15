import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"
import { useState, useEffect } from "react"
import { getTags } from "../managers/TagManager"




export const ApplicationViews = ({setToken}) => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        // Fetch tags from the server and update the state
       getTags().then((tagsData) => setTags(tagsData));
    }, []);


    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized />}>
            <Route path="/events" element={<EventList />} />
            <Route path="/events/new/tags" element={<EventForm setToken={setToken} tags ={tags} />} />
            </Route>
        </Routes>
    </>
}

// i'm confused about this token stuff.. and i don't feel great about this useEffect in application view.