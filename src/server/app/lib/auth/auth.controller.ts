import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { __age__ } from "../../../constants";
import { UsersService } from "../users/users.service";

@Controller("/auth")
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Get("/")
    @UseGuards(AuthGuard("discord"))
    async login(@Req() req: Request, @Res() res: Response) {
        return;
    }

    @Get("/redirect")
    @UseGuards(AuthGuard("discord"))
    async save(@Req() req: Request, @Res() res: Response) {
        //@ts-ignore
        const user = await this.usersService.findOne(req.user.id);

        res.clearCookie("access_token", { maxAge: __age__ });
        //@ts-ignore
        res.cookie("access_token", user.accessToken, { maxAge: __age__ });

        return res.redirect("/");
    }

    @Get("/logout")
    async logout(@Req() req: Request, @Res() res: Response) {
        res.clearCookie("access_token", { maxAge: __age__ });

        return res.redirect("/");
    }
}
