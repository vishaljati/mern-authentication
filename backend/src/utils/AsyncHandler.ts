import { Request, Response, RequestHandler, NextFunction } from "express"

export function AsyncHandler(handler: RequestHandler) {
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next))
            .catch(next)
    }
}