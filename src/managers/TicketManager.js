export const getTickets = () => {
    return fetch("http://localhost:8000/tickets", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    })
        .then(response => response.json())
}

export const createTicket = (ticket) => {
    return fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,

        },
        body: JSON.stringify(ticket)

    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to create ticket")
            }
            return response.json()
        })
}
export const getSingleTicket = (id) => {
    return fetch(`http://localhost:8000/tickets/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

// export const getEventsCreatedByUser = (id) => {
//     return fetch(`http://localhost:8000/events?user=${id}`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("auth_token")}`,
//         }
//     })
//         .then(response => response.json())
// }

export const EditTicket = (ticket) => {
    return fetch(`http://localhost:8000/events/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(ticket)
    })

}

export const deleteTicket = (ticketId) => {
    return fetch(`http://localhost:8000/tickets/${ticketId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
