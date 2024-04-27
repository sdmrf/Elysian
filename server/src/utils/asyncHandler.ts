import { Request, Response, NextFunction } from 'express';
import { ControllerType } from '../types/types.js';

const asyncHandler = (reqHandler: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(reqHandler(req, res, next)).catch(next);
}

export { asyncHandler }

// Alternative approach
/*
* asyncHandler is the function which wrappes the controller function and returns a new function which is a promise.
* We can also use the async/await syntax to handle the promise.

* const asyncHandler = (reqHandler: ControllerType) => async (req: Request, res: Response, next: NextFunction) => {
*   try {
*     await reqHandler(req, res, next);
*   } catch (error) {
*     next(error);
*   }
* }
 */

