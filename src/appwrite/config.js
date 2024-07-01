import { Account, ID , Client, Databases } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('666191a00026fbe3a2bc');
export const account = new Account(client);
export const db = new Databases(client)

