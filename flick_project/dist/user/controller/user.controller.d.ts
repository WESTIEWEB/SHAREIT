import express, { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const getUserProfileController: (req: JwtPayload, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.controller.d.ts.map