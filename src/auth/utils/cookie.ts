import { Response } from 'express'

export const set = (res: Response, token: string) => {
  res.cookie('jit', token, {
    httpOnly: true
  })
}
