import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rejection } from "../graphql/models/rejection.model";
import { RejectionsService } from "./rejections.service";

@Module({
    imports: [TypeOrmModule.forFeature([Rejection])],
    providers: [RejectionsService],
})
export class RejectionsModule {}
