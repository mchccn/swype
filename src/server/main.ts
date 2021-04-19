import { NestFactory } from "@nestjs/core";
import * as connect from "connect-redis";
import * as cookies from "cookie-parser";
import * as session from "express-session";
import * as redis from "redis";
import { AppModule } from "./app/app.module";
import { __prod__ } from "./constants";

(async () => {
    try {
        (await import("./client")).default(process.env.TOKEN);

        const client = redis.createClient();

        const app = await NestFactory.create(AppModule);

        app.use(
            session({
                store: __prod__ ? new (connect(session))({ client }) : undefined,
                secret: "swype",
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    sameSite: "lax",
                    secure: !__prod__,
                },
                saveUninitialized: false,
                resave: false,
            })
        );

        app.use(cookies());

        await app.listen(process.env.PORT || 3000);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
