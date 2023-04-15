import Joi from 'joi';
export declare const registerSchema: Joi.ObjectSchema<any>;
export declare const loginSchema: Joi.ObjectSchema<any>;
export declare const chatUserSchema: Joi.ObjectSchema<any>;
export declare const newChatSchema: Joi.ObjectSchema<any>;
export declare const options: {
    abortEarly: boolean;
    allowUnknown: boolean;
    stripUnknown: boolean;
    errors: {
        wrap: {
            label: string;
        };
    };
};
export declare const generateSalt: () => Promise<string>;
export declare const generateHash: (password: string, salt: string) => Promise<string>;
export declare const verifyPassword: (password: string, hash: string, salt: string) => Promise<boolean>;
//# sourceMappingURL=validation.d.ts.map