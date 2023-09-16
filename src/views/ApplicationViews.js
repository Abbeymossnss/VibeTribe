import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { EventList } from "../components/event/EventList";
import { EventForm } from "../components/event/EventForm";
import { UpdateEvent } from "../components/event/UpdateEvent";
import { useState, useEffect } from "react";
import { getTags } from "../managers/TagManager";


// Create a function to fetch user data
export const ApplicationViews = ({ setToken, isStaff,setIsStaff }) => {
    const [tags, setTags] = useState([]);

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login isStaff={isStaff} />} />
                <Route path="/register" element={<Register setToken={setToken} setIsStaff={setIsStaff} />} />
                <Route element={<Authorized />}>
                    <Route path="/events" element={<EventList isStaff={isStaff} />} />
                    <Route path="/events/new/" element={<EventForm setToken={setToken} tags={tags} isStaff={isStaff} />} />
                    <Route path="/events/:eventId" element={<UpdateEvent setToken={setToken} tags={tags} isStaff={isStaff}/>} />
                </Route>
            </Routes>
        </>
    );
};


// i'm confused about this token stuff.. and i don't feel great about this useEffect in application view.