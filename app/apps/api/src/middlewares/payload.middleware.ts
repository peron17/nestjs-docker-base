import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { JtwParser } from "../common";


type ExtendedRequest = Request & {
    createdBy: string;
    createdByName: string;
    updatedBy: string;
    updatedByName: string;
    deletedBy: string;
    deletedByName: string;
};

@Injectable()
export class PayloadMiddleware implements NestMiddleware {
    use(req: ExtendedRequest, res: Response, next: NextFunction) {
        let authorization = req.header('Authorization');

        if (!authorization) {
            throw new HttpException('Header Bearer cant be null!', HttpStatusCode.Unauthorized);
        }
        
        const user = JtwParser(authorization)

        if (req.method == 'POST') {
            req.body.createdBy = user.sid;
            req.body.createdByName = user.name;
        }

        if (req.method == 'PATCH' || req.method == 'PUT') {
            req.body.updatedBy = user.sid;
            req.body.updatedByName = user.name;
        }

        if (req.method == 'DELETE') {
            req.body.deletedBy = user.sid;
            req.body.deletedByName = user.name;
            req.body.isDeleted = 1;
        }

        req.body.permissions =  user?.permissions === undefined ? [] : user?.permissions;

        next();
    }
}

