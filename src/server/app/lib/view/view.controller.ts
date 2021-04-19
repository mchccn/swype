import { Controller, Get, Next, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { __prod__ } from "../../../constants";
import { ViewService } from "./view.service";

@Controller("/")
export class ViewController {
    constructor(private viewService: ViewService) {}

    @Get("*")
    static(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        if (!__prod__ && req.url.startsWith("/graphql")) return next();

        const handle = this.viewService.getServer().getRequestHandler();

        if (req.url.startsWith("/app")) return next();

        return handle(req, res);
    }

    @Get("/app")
    app(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        if (!req.cookies["access_token"]) return res.redirect("/auth");

        const handle = this.viewService.getServer().getRequestHandler();

        return handle(req, res);
    }
}
