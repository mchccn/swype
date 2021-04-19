import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserInputError } from "apollo-server-express";
import { __prod__ } from "../../../constants";
import { UsersService } from "../users/users.service";
import { GraphQLGuard } from "./graphql.guard";
import { Tags } from "./models/tags";
import { User } from "./models/user.model";

@Resolver()
export class GraphQLResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => User, { nullable: true })
    async user(@Args("accessToken", { type: () => String }) accessToken: string) {
        return this.usersService.findOneWhere({
            accessToken,
        });
    }

    @Query(() => User, { nullable: true })
    async userInfo(@Args("id", { type: () => String }) id: string) {
        const user = await this.usersService.findOne(id);

        return user ? (__prod__ ? { ...user, accessToken: "", refreshToken: "" } : user) : null;
    }

    @Query(() => User, { nullable: true })
    async userMatch(@Args("id", { type: () => String }) id: string) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        const all = await this.usersService.find();

        const users = all.filter(
            (u) => u.tags.some((t) => user.tags.includes(t)) && !user.matches.includes(u.id) && !user.rejections.includes(u.id)
        );

        for (let i = users.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [users[i], users[j]] = [users[j], users[i]];
        }

        const scores = users.map((u) => user.tags.reduce((total, tag) => (u.tags.includes(tag) ? total + 1 : total), 0));

        const highest = Math.max(...scores);

        const best = scores.flatMap((score, i) => (score === highest ? [users[i]] : []));

        const chosen = best[Math.floor(Math.random() * best.length)];

        return __prod__ ? { ...chosen, accessToken: "", refreshToken: "" } : chosen;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async updateBio(@Args("id", { type: () => String }) id: string, @Args("bio", { type: () => String }) bio: string) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        if (bio.length > 512) throw new UserInputError("User bio is over 512 characters.");

        const newUser = { ...user, bio };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async addTag(@Args("id", { type: () => String }) id: string, @Args("tag", { type: () => String }) tag: Tags) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        if (!Object.keys(Tags).includes(tag)) throw new UserInputError("Invalid tag.");

        const tags = [...new Set(user.tags.concat(tag))];

        const newUser = { ...user, tags };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async removeTag(@Args("id", { type: () => String }) id: string, @Args("tag", { type: () => String }) tag: Tags) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        if (!Object.keys(Tags).includes(tag)) throw new UserInputError("Invalid tag.");

        const tags = user.tags.filter((t) => t !== tag);

        const newUser = { ...user, tags };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async addMatch(@Args("id", { type: () => String }) id: string, @Args("match", { type: () => String }) match: string) {
        if (id === match) return null;

        const user = await this.usersService.findOne(id);

        if (!user) return null;

        const other = await this.usersService.findOne(match);

        if (!other) return null;

        const matches = [...new Set(user.matches.concat(match))];

        const newUser = { ...user, matches };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async removeMatch(@Args("id", { type: () => String }) id: string, @Args("match", { type: () => String }) match: string) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        const other = await this.usersService.findOne(match);

        if (!other) return null;

        const matches = user.matches.filter((m) => m !== match);

        const newUser = { ...user, matches };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async addRejection(
        @Args("id", { type: () => String }) id: string,
        @Args("rejection", { type: () => String }) rejection: string
    ) {
        if (id === rejection) return null;

        const user = await this.usersService.findOne(id);

        if (!user) return null;

        const other = await this.usersService.findOne(rejection);

        if (!other) return null;

        const rejections = [...new Set(user.rejections.concat(rejection))];

        const newUser = { ...user, rejections };

        await this.usersService.update(id, newUser);

        return newUser;
    }

    @Mutation(() => User, { nullable: true })
    @UseGuards(GraphQLGuard)
    async removeRejection(
        @Args("id", { type: () => String }) id: string,
        @Args("rejection", { type: () => String }) rejection: string
    ) {
        const user = await this.usersService.findOne(id);

        if (!user) return null;

        const other = await this.usersService.findOne(rejection);

        if (!other) return null;

        const rejections = user.rejections.filter((r) => r !== rejection);

        const newUser = { ...user, rejections };

        await this.usersService.update(id, newUser);

        return newUser;
    }
}
