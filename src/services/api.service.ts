import httpClient from "./config/httpClient";

export async function sendTokens(payload: any): Promise<any>{
    return httpClient.post("/send-token", payload);   
}