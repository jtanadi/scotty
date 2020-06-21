import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.url.endsWith(".js")) {
    req.url = `${req.url}.gz`
    res.set("Content-Encoding", "gzip")
  }

  next()
}
