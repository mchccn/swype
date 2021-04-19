import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../graphql/models/user.model";
import { UsersService } from "./users.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
})
export class UsersModule {}
