
export const getTags = () => {
    
    return fetch("http://localhost:8000/tags", {
        method: "GET",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
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