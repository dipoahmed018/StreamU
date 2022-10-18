import { Request, Response } from "express"

export const startStream = (req: Request, res: Response) => {
    res.send('stream starting....')
}