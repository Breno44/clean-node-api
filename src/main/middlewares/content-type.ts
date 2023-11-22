import { type NextFunction, type Request, type Response } from 'express'

export const contentType = (re: Request, res: Response, next: NextFunction): void => {
  res.type('json')

  next()
}
