import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { Tags } from "./tags";

@ObjectType()
@Entity()
@Unique(["id"])
export class User {
    @Field(() => String)
    @PrimaryColumn()
    readonly id: string;

    @Field(() => String)
    @Column()
    readonly avatar: string;

    @Field(() => String)
    @Column()
    readonly username: string;

    @Field(() => String)
    @Column()
    readonly accessToken: string;

    @Field(() => String)
    @Column()
    readonly refreshToken: string;

    @Field(() => String)
    @Column()
    readonly bio: string;

    @Field(() => [Tags])
    @Column("text", { array: true })
    readonly tags: Tags[];

    @Field(() => [String])
    @Column("text", { array: true })
    readonly matches: string[];

    @Field(() => [String])
    @Column("text", { array: true })
    readonly rejections: string[];
}
