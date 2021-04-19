import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../graphql/models/user.model";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DiscordStrategy } from "./discord.strategy";

@Module({
    imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
    providers: [AuthService, UsersService, DiscordStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
