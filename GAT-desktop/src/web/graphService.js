import { Client } from "@microsoft/microsoft-graph-client";

let graphClient;

function ensureClient(authProvider) {
    if (!graphClient) {
        graphClient = Client.initWithMiddleware({
            authProvider,
        });
    }

    return graphClient;
}

export async function getUser(authProvider) {
    ensureClient(authProvider);

    // Return the /me API endpoint result as a User object
    const user = await graphClient.api("/me")
        .select("displayName,mail,mailboxSettings,userPrincipalName")
        .get();

    return user;
}

export async function getUserMails(authProvider, { search }) {
    ensureClient(authProvider);
    const mails = await graphClient.api("/me/messages")
        .select("id,createdDateTime, hasAttachments, subject, body, from") // only select needed data
        .search(search) // Search
        .top(20) // return top 20
        .count(true) // Count the total number of results
        .get();
    return mails;
}
