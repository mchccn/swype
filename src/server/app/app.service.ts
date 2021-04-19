import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as cron from "node-cron";
import { Repository } from "typeorm";
import { __month__ } from "../constants";
import { Rejection } from "./lib/graphql/models/rejection.model";
import { User } from "./lib/graphql/models/user.model";

@Injectable()
export class AppService implements OnModuleInit {
    constructor(
        @InjectRepository(Rejection) private rejections: Repository<Rejection>,
        @InjectRepository(User) private users: Repository<User>
    ) {}

    async onModuleInit() {
        try {
            cron.schedule("0 * * * *", async () => {
                const rejections = await this.rejections.find();

                await Promise.all(
                    rejections.map(async ({ key, user, rejected, timestamp }) => {
                        if (Date.now() - timestamp > __month__) {
                            const u = await this.users.findOne(user);

                            if (u) {
                                const rejections = u.rejections.filter((r) => r !== rejected);

                                const newUser = { ...u, rejections };

                                await this.users.update(u.id, newUser);
                            }

                            await this.rejections.delete(key);
                        }
                    })
                );
            });
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}
