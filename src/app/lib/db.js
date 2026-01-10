import { createClient } from 'redis';

const client =  createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});


client.on('error', err => console.log('Redis Client Error', err));

if (!client.isOpen){
    client.connect();
}
export {client}


