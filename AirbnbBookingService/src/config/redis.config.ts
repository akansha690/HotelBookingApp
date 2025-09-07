
import IORedis, { Redis } from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';

const redisConfig = {
    url : serverConfig.REDIS_SERVER_URL,
    maxRetriesPerRequest: null
}

//Singleton pattern 
const redisConnection = ()=>{
    try {
        let connection:Redis;
        
        return ()=>{
            if(!connection){
                connection = new IORedis(redisConfig);
                return connection;
            }
            return connection;
        }
    } catch (error:any) {
        console.log("redis connection failed", error.message);
        throw error;
    }
}

export const getRedisConnection = redisConnection();
export const redlock = new Redlock([getRedisConnection()], {
    retryCount:10,
    retryDelay:200,
})