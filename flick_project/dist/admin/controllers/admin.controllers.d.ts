import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export declare const controllerCreateSuperAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const controllerCreateAdmin: (req: JwtPayload, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=admin.controllers.d.ts.map