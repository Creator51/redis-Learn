const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port : 6379
})


client.on('error',(error)=>
     console.log("redis client error occured",error)
);

async function testadditionalFeatures(){
    try {
        await client.connect()

        // const subscriber = client.duplicate() //create a new client -> shares same connection
        // await subscriber.connect() //connect to redis server for the subscription

        // await subscriber.subscribe("dummy-channel",(message,channel)=>{
        //     console.log(`received message from ${channel} : ${message}`)

        // });

        // //Publish message to dummy channel 
        // await client.publish("dummy-channel","some message 1")
        // await client.publish("dummy-channel","New message 2")

        // await new Promise((resolve) => setTimeout(resolve,3000))

        // await subscriber.unsubscribe("dummy-channel")
        // await subscriber.quit() // close the subscriber connection

        //Pipelining & Transaction -> multiple transactions in One go
 
        // const multi = client.multi()

        // multi.set("key-transaction1","value1")
        // multi.set("key-transaction2","value2")
        // multi.get("key-transaction1")
        // multi.get("key-transaction2")

        // const results = await multi.exec()
        // console.log(results)

        console.log("performance test")
        console.time("without pipelining")

        for ( let i=0;i<1000;i++){
            await client.set(`user${i}`,`user_value${i}`)

        }
        console.timeEnd("without pipelining")

        console.time("with pipelining")
        const bigPipeline = client.multi()
        for(let i=0;i<1000;i++){
            bigPipeline.set(  `user_pipe${i}`,`user_pipee${i}`)

        }
        await bigPipeline.exec()
        console.timeEnd("with pipelining")
         
    } catch (error) {
        console.log(error)
        
    } finally {
        client.quit()
    }
}

testadditionalFeatures()