import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EventList } from "../components/event/EventList"
import { EventForm } from "../components/event/EventForm"


export const ApplicationViews = ({setToken}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized />}>
            <Route path="/events" element={<EventList />} />
            <Route path="/events/new" element={<EventForm />} />
            </Route>
        </Routes>
    </>
}
