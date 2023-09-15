const getAuthHeaders = () => ({
    "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    "Content-Type": "application/json"

});

export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
        method: "GET",
        headers: getAuthHeaders()
    })
        .then((response) =>{
            if (response.ok) {
                return response.json();
        }   else {
                throw new Error("Failed to fetch tags.")
        }
        })
}

























// GET tags, import that into events. 