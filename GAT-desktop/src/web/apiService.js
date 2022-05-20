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
    debugger;
    const response = await fetch("https://jnapi.azurewebsites.net/api/pdf", { headers: { "Content-Type": "application/json" } });
}

// CSP - Content Security Policy
