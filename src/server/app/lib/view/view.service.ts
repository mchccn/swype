import { Injectable, OnModuleInit } from "@nestjs/common";
import next from "next";
import { __prod__ } from "../../../constants";

@Injectable()
export class ViewService implements OnModuleInit {
    private server: ReturnType<typeof next>;

    async onModuleInit() {
        try {
            this.server = next({ dev: !__prod__, dir: "./src/client" });

            await this.server.prepare();
        } catch (error) {
            console.log(error);
        }
    }

    getServer() {
        return this.server;
    }
}
