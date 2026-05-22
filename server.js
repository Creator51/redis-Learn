const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port : 6379
})

//event listener

client.on('error',(error)=>
     console.log("redis client error occured",error)
);

async function testRedisConnection(){
    try {
        await client.connect()
        console.log('Connected to redis')
        //adding
        await client.set("key1","value1");

        const retrive = await client.get("key1");

        console.log(retrive)

        //delete
        const delcount = await client.del("key1")
        console.log(delcount)
    } catch (error) {
        console.error(error);
        
    } finally {
        await client.quit();
    }
}

testRedisConnection();