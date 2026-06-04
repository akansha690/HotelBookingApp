
import dotenv from 'dotenv';

dotenv.config();


type dbConfig={
    HOST:string,
    PORT:number,
    REDIS_HOST:string,
    REDIS_PORT:number,
    USER:string,
    PASS:string
}


export const serverConfig: dbConfig = {
    PORT: Number(process.env.PORT) || 3004,
    HOST: String(process.env.HOST),
    REDIS_HOST: String(process.env.REDIS_HOST),
    REDIS_PORT:Number(process.env.REDIS_PORT),
    USER: String(process.env.USER),
    PASS: String(process.env.PASS),
    
} 




