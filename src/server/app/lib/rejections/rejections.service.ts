import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, ObjectLiteral, Repository } from "typeorm";
import { Rejection } from "../graphql/models/rejection.model";

@Injectable()
export class RejectionsService {
    constructor(@InjectRepository(Rejection) private rejections: Repository<Rejection>) {}

    async find() {
        return this.rejections.find();
    }

    async findOne(id: string) {
        return this.rejections.findOne(id);
    }

    async findOneWhere(query: string | ObjectLiteral | FindConditions<Rejection> | FindConditions<Rejection>[]) {
        return this.rejections.findOne(undefined, {
            where: query,
        });
    }

    async create(user: Rejection) {
        return this.rejections.insert(user);
    }

    async delete(id: string) {
        return this.rejections.delete(id);
    }

    async update(id: string, user: Rejection) {
        return this.rejections.update(id, user);
    }
}
