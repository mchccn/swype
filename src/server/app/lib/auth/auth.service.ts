import { Injectable } from "@nestjs/common";
import { User } from "../graphql/models/user.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(details: User) {
        const { id } = details;

        const user = await this.userService.findOne(id);

        if (user) {
            await this.userService.update(id, details);

            return user;
        }

        return this.userService.create(details);
    }
}
