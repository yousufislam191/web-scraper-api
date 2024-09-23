import { GoogleAuth, OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import path from "path";

const credentialsPath = path.join(
  __dirname,
  "..",
  "config",
  "credentials.json"
);
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const authenticate = async () => {
  const auth = new GoogleAuth({
    keyFile: credentialsPath, // replace with path to your service account key file
    scopes: SCOPES,
  });

  const authClient = (await auth.getClient()) as OAuth2Client;
  const sheets = google.sheets({ version: "v4", auth: authClient });

  return sheets;
};

export { authenticate };
