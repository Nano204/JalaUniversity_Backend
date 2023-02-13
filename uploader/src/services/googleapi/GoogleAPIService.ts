import { drive_v3, google } from "googleapis";
import fs from "fs";
import env from "../../env";
import { OAuth2Client } from "google-auth-library";

type GoogleFileResponse = {
    id: string;
    name: string;
    mimeType: string;
    webContentLink: string;
    webViewLink: string;
};

type GoogleFileRequest = {
    name: string;
    size: number;
    mimeType: string;
    path: string;
};

export default class GoogleAPIService {
    private oauth2Client: OAuth2Client;
    private drive: drive_v3.Drive;

    constructor(googleDriveKey: string) {
        this.oauth2Client = new google.auth.OAuth2(
            env.GOOGLEAPI_CLIENT_ID,
            env.GOOGLEAPI_CLIENT_SECRET,
            env.GOOGLEAPI_REDIRECT_URI
        );
        this.drive = google.drive({
            version: "v3",
            auth: this.oauth2Client,
        });
        this.oauth2Client.setCredentials({
            refresh_token: googleDriveKey,
        });
    }

    public async uploadFile(fileRequestInfo: GoogleFileRequest) {
        try {
            const file = await this.drive.files.create({
                requestBody: {
                    name: fileRequestInfo.name,
                    mimeType: fileRequestInfo.mimeType,
                },
                media: {
                    mimeType: fileRequestInfo.mimeType,
                    body: fs.createReadStream(fileRequestInfo.path || ""),
                },
            });
            const fileId = file.data.id as string;
            await this.drive.permissions.create({
                fileId,
                requestBody: { role: "reader", type: "anyone" },
            });
            const response = await this.drive.files.get({
                fileId,
                fields: "id, name, size, mimeType, webViewLink, webContentLink",
            });
            return response.data as GoogleFileResponse;
        } catch (error) {
            console.error(error);
        }
    }

    public async deleteFile(fileId: string) {
        try {
            await this.drive.files.delete({ fileId });
        } catch (error) {
            console.error(error);
        }
    }
}
