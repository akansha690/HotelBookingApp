
import Redis from 'ioredis';
import { serverConfig } from './server.config';

const redisConfig = {
    host:serverConfig.REDIS_HOST,
    port:serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null
}

//Singleton pattern 
const redisConnection = ()=>{
    try {
        let connection:Redis;
        
        return ()=>{
            if(!connection){
                connection = new Redis(redisConfig);
                return connection;
            }
            return connection;
        }
    } catch (error:any) {
        console.log("redis connection failed", error.message);
        throw error;
    }
}

export const connectRedisObject = redisConnection();