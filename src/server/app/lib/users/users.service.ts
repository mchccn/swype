import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { User } from "../graphql/models/user.model";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private users: Repository<User>) {}

    async find() {
        return this.users.find();
    }

    async findOne(id: string) {
        return this.users.findOne(id);
    }

    async findOneWhere(query: string | ObjectLiteral | FindConditions<User> | FindConditions<User>[]) {
        return this.users.findOne(undefined, {
            where: query,
        });
    }

    async create(user: User) {
        return this.users.insert(user);
    }

    async delete(id: string) {
        return this.users.delete(id);
    }

    async update(id: string, user: User) {
        return this.users.update(id, user);
    }
}
