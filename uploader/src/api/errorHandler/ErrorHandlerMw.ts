import { NextFunction, Request, Response } from "express";
import { Exception } from "./Exceptions";

export default class ErrorHandlersMiddleWare {
    logErrors(err: Exception | Error, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        next(err);
    }

    serverErrorHandler(
        err: Exception | Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        if (req.xhr) {
            res.status(500).json({
                code: 500,
                errorMessage: "Something failed! Server error",
            });
        } else {
            next(err);
        }
    }

    errorHandler(
        err: Exception | Error,
        req: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction
    ) {
        const errorCode = "code" in err ? err.code : 500;
        res.status(errorCode).json({ code: errorCode, errorMessage: err.message });
    }
}
