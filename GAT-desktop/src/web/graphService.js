import { Client } from "@microsoft/microsoft-graph-client";
import kqlSearch from "./kqlService";

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
        .select("displayName,mail,userPrincipalName")
        .get();
    return user;
}

export async function getUserMails(authProvider, { search }) {
    ensureClient(authProvider);
    const fromDate = "2022-01-01";
    const selects = "id, sentDateTime, receivedDateTime, hasAttachments, subject, body, from";
    const searchWithDate = `"(${search}) AND (received>=${fromDate} OR sent>=${fromDate})"`;
    const mails = await graphClient.api("/me/messages")
        .select(selects) // only select needed data
        .search(searchWithDate) // Search
        .top(20) // return top 20
        .count(true) // Count the total number of results
        .get();
    mails.value = mails.value.map((m) => {
        const searchKql = kqlSearch(search, m);

        let sortVal = searchKql.body?.length || 0;
        sortVal += searchKql.subject?.length || 0;
        sortVal += m.hasAttachments ? 5 : 0 

        return { 
            search: searchKql, 
            sortVal, 
            ...m 
        };
    });
    mails.value.sort((a, b) => {
        return b.sortVal - a.sortVal;
    });

    return mails;
}

export async function deleteUserMail(authProvider, emailId) {
    ensureClient(authProvider);
    try {
        await graphClient.api(`/me/messages/${emailId}`).delete();
    } catch (err) {
        return false;
    }
    return true;
}
