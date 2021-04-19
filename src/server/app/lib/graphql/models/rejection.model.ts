import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Rejection {
    @Field(() => String)
    @PrimaryColumn()
    readonly key: string;

    @Field(() => String)
    @Column()
    readonly user: string;

    @Field(() => String)
    @Column()
    readonly rejected: string;

    @Field(() => Number)
    @Column()
    readonly timestamp: number;
}
