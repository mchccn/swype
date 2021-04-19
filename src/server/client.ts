import { Logger } from "@nestjs/common";
import { Client } from "discord.js";

export default async (token: string) => {
    const client = new Client();

    client.once("ready", () => {
        Logger.log("Client is ready!", "Client");
    });

    await client.login(token);

    return client;
};
