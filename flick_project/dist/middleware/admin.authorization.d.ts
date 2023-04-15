import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
export declare const authAdmin: (req: JwtPayload, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=admin.authorization.d.ts.map