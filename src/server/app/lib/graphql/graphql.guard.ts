import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlContextType } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./models/user.model";

@Injectable()
export class GraphQLGuard implements CanActivate {
    constructor(@InjectRepository(User) private users: Repository<User>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (context.getType<GqlContextType>() !== "graphql") return;

        const [, query, { req }] = context.getArgs();

        const { id } = query;

        const user = await this.users.findOne(id);

        if (!user) return false;

        if (!req.headers.authorization) return false;

        const accessToken = req.headers.authorization.slice("Bearer ".length);

        if (user.accessToken !== accessToken) return false;

        return true;
    }
}
