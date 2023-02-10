import { NextFunction, Request, Response } from "express";
import { Exception } from "./Exceptions";

export default class ErrorHandlersMiddleWare {
    logErrors(err: Exception, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        next(err);
    }

    serverErrorHandler(err: Exception, req: Request, res: Response, next: NextFunction) {
        if (req.xhr) {
            res.status(500).json({ code: 500, errorMessage: "Something failed! Server error" });
        } else {
            next(err);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorHandler(err: Exception, req: Request, res: Response, next: NextFunction) {
        res.status(err.code).json({ code: err.code, errorMessage: err.message });
    }
}
