import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const authUser: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=user.authorization.d.ts.map