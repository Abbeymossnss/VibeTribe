import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { useState } from "react"


export const VibeTribe = () => {
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    return <>
        <NavBar token={token} setToken={setToken} />
        <ApplicationViews token={token} setToken={setToken} />
    </>
}
