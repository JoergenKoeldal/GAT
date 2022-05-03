import { Client } from '@microsoft/microsoft-graph-client';

let graphClient = undefined;

function ensureClient(authProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider
    });
  }

  return graphClient;
}

export async function getUser(authProvider){
  ensureClient(authProvider);
    console.log(graphClient);

  // Return the /me API endpoint result as a User object
  const user = await graphClient.api('/me')
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}

export async function getUserMails(authProvider){
    ensureClient(authProvider);
    const mails = await graphClient.api("/me/messages")
        .select("id,createdDateTime, hasAttachments, subject, body")
        .top(20)
        .get();
    return mails;
}
