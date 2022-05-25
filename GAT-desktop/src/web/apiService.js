// gets all sources from the API
export async function getSources() {
    const response = await fetch("https://jnapi.azurewebsites.net/api/sources", { headers: { "Content-Type": "application/json" } });
    // transforms html body to json object
    const sources = await response.json();
    return sources;
}

// gets all keywords from the API
export async function getKeywordLists() {
    const response = await fetch("https://jnapi.azurewebsites.net/api/keywordlists", { headers: { "Content-Type": "application/json" } });
    // transforms html body to json object
    const keywordLists = await response.json();
    return keywordLists;
}

// gets all keywords from the API
export async function generatePdf() {
    const response = await fetch("https://jnapi.azurewebsites.net/api/pdf", { headers: { "Content-Type": "application/json" } });
}

export async function getDepartments() {
    const response = await fetch("https://jnapi.azurewebsites.net/api/departments", { headers: { "Content-Type": "application/json" } });
    return await response.json();
}

export async function getJNDataUser(email) {
    const response = await fetch(`https://jnapi.azurewebsites.net/api/users/${email}`, { headers: { "Content-Type": "application/json" } });
    return await response.json();
}

export async function postSearch(body){
    const response = await fetch(
        "https://jnapi.azurewebsites.net/api/Cleanups", 
        { 
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json",  } 
        });
}

export async function postCompleteGDPR(userId){
    const response = await fetch(
        `https://jnapi.azurewebsites.net/api/UserFinishedSchedules?userId=${userId}`, 
        { 
            method: "POST",
            headers: { "Content-Type": "application/json",  } 
        });
}

// CSP - Content Security Policy
