import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { __prod__ } from "../constants";
import { AppService } from "./app.service";
import { AuthModule } from "./lib/auth/auth.module";
import { GraphQLEndpointModule } from "./lib/graphql/graphql.module";
import { Rejection } from "./lib/graphql/models/rejection.model";
import { User } from "./lib/graphql/models/user.model";
import { ViewModule } from "./lib/view/view.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: __prod__ ? ".env.production" : ".env.development",
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: "schema.gql",
            context: ({ req }) => ({ headers: req.headers }),
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.CONNECTION_URI,
            entities: ["dist/**/*.model.js"],
            migrationsTableName: "migrations",
            migrations: ["src/server/migrations/*.ts"],
            cli: {
                migrationsDir: "src/server/migrations",
            },
            ssl: __prod__,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Rejection]),
        TypeOrmModule.forFeature([User]),
        GraphQLEndpointModule,
        AuthModule,
        ViewModule,
    ],
    providers: [AppService],
})
export class AppModule {}
