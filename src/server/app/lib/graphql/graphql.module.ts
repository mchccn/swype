import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { GraphQLResolver } from "./graphql.resolver";
import { User } from "./models/user.model";

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([User])],
    providers: [GraphQLResolver, UsersService],
})
export class GraphQLEndpointModule {}
