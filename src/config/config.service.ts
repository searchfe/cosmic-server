import { Injectable } from '@nestjs/common';
import { resolve, dirname } from "path";
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';


export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        console.log(`load env at ${filePath}`);
        this.envConfig = this.validateInput(dotenv.parse(fs.readFileSync(filePath)));
        Object.keys(this.envConfig).forEach((key) => {
          this.envConfig[key] = this.envConfig[key].replace(/\$\{([A-Za-z0-9\-\_]+)\}/g, (root) => {
            const k = root.substring(2, root.length-1);
            if (this.envConfig[k]) {
              return this.envConfig[k];
            }
            if(k==='__dirname') {
              return dirname(filePath);
            }
            throw new Error(`undefined env config: ${root}`);
          });
          // if (this.envConfig[key].indexOf('${') > -1) {
          //   this.envConfig[key] = eval.call(this.envConfig, `\`${this.envConfig[key]}\``);
          // }
        });
    }

    // get(key: string): string {
    //   return this.envConfig[key];
    // }

    get LOCAL_STATIC_ROOT() {return this.envConfig.LOCAL_STATIC_ROOT;}
    get LOCAL_WEB_ROOT(): string {return this.envConfig.LOCAL_WEB_ROOT;}

    get PORT() {return this.envConfig.PORT as any;}

    get STATIC_PREFIX(): string {return this.envConfig.STATIC_PREFIX;}
    get TEMP_FLODER() {return this.envConfig.TEMP_FLODER;}
    get PAGE_404() {return this.envConfig.PAGE_404;}
    get PAGE_ACCESS() {return this.envConfig.PAGE_ACCESS;}
    get PAGE_ERROR() {return this.envConfig.PAGE_ERROR;}
    get PAGE_LANDING() {return this.envConfig.PAGE_LANDING;}
    get PAGE_LOGIN() {return this.envConfig.PAGE_LOGIN;}

    get DB_TYPE() {return this.envConfig.DB_TYPE as any;}
    get DB_HOST() {return this.envConfig.DB_HOST;}
    get DB_PORT() {return this.envConfig.DB_PORT as any;}
    get DB_USERNAME() {return this.envConfig.DB_USERNAME;}
    get DB_PASSWORD() {return this.envConfig.DB_PASSWORD;}
    get DB_DATABASE() {return this.envConfig.DB_DATABASE;}
    get DB_URI() {return this.envConfig.DB_URI;}

    get JWT_SECRET() {return this.envConfig.JWT_SECRET}
    get JWT_SIGN_EXPIRES() {return this.envConfig.JWT_SIGN_EXPIRES}

    get uploadTempFolder(): string {return this.resolveLocal(this.envConfig.TEMP_FLODER);}

    get userAvatarFolder(): string {return this.resolveLocal(this.envConfig.USER_AVATAR_FLODER);}

    private resolveLocal(str: string) {return resolve(this.envConfig.LOCAL_STATIC_ROOT, str);}
    // resolveStaticRoot(...str: string[]) {
    //   return resolve(this.envConfig.SITE_STATIC_ROOT, ...str);
    // }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
          NODE_ENV: Joi.string()
            .valid(['development', 'production', 'test', 'provision'])
            .default('development'),
            LOCAL_STATIC_ROOT: Joi.string().required(),
            LOCAL_WEB_ROOT: Joi.string().required(),
            PORT: Joi.string().required(),
            STATIC_PREFIX: Joi.string().required(),
            TEMP_FLODER: Joi.string().required(),
            USER_AVATAR_FLODER: Joi.string().required(),
            PAGE_404: Joi.string().required(),
            PAGE_ACCESS: Joi.string().required(),
            PAGE_ERROR: Joi.string().required(),
            PAGE_LANDING: Joi.string().required(),
            PAGE_LOGIN: Joi.string().required(),
            DB_TYPE: Joi.string().required(),
            DB_HOST: Joi.string().allow('').allow(null),
            DB_PORT: Joi.string().allow('').allow(null),
            DB_USERNAME: Joi.string().allow('').allow(null),
            DB_PASSWORD: Joi.string().allow('').allow(null),
            DB_DATABASE: Joi.string().required(),
            DB_URI: Joi.string().allow('').allow(null),
            JWT_SIGN_EXPIRES: Joi.string().required(),
            JWT_SECRET: Joi.string().required()
          // PORT: Joi.number().default(3000),
          // API_AUTH_ENABLED: Joi.boolean().required(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
          envConfig,
          envVarsSchema,
        );
        if (error) {
          throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
}

export const config: ConfigService = new ConfigService(`${process.env.NODE_ENV}.env`);
