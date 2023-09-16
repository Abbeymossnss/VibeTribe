import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { useState } from "react"


export const VibeTribe = () => {
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [isStaff, setIsStaffState] = useState(localStorage.getItem('is_staff'))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }
    const setIsStaff = (newIsStaff) => {
        localStorage.setItem('is_staff', newIsStaff)
        setIsStaffState(newIsStaff)
    }
    return <>
        <NavBar token={token} setToken={setToken} />
        <ApplicationViews token={token} setToken={setToken} isStaff={isStaff} setIsStaff={setIsStaff} />
        
    </>
}
// setIsStaff={setIsStaff} in return later, invoke setIsStaff state.