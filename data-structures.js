const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port : 6379
})

//event listener

client.on('error',(error)=>
     console.log("redis client error occured",error)
);

async function redisDatastructure(){
    try {
        // Strings -> SET,GET,MSET,MGET
        await client.connect();
        // console.log("Connected successfully ")
         await client.mSet(["user:email","gautam@p","pass","password1","pa","pa"])
        
        // const [retrive,pass,pa] = await  client.mGet(["user:email","pass","pa"])
        // console.log(retrive,pass,pa)

        // List -> LPUSH , RPUSH , LRANGE , LPOP , RPOP

        // await client.lPush('notes',['note1','note2','note3'])
        // const extractAllNotes = await client.lRange('notes',0,-1)
        // console.log(extractAllNotes)

        //Lpop pop and return
        //e.log(firstNote)

        //sets -> SADD,SMEMEBERS,SISMEMBER, SREM
        // await client.sAdd('user:nickname',["john","varun","xyz"])
        // const extractUserNicknames = await client.sMembers("user:nickname");
        //  console.log(extractUserNicknames)

        //  //check
        //  const isvarumamemeber = await client.sIsMember("user:nickname","varun")
        //  console.log(isvarumamemeber)

        //  //set del
        //  await client.sRem("user:nickname","xyz")
        //  const updated = await client.sMembers("user:nickname")
        //  console.log(updated)

        // Sorted sets -> ZADD,ZRANGE,ZREM

        // await client.zAdd('cart',[
        //     {
        //         score:100 , value : 'cart 1'
        //     },
        //     {
        //         score:150 , value : 'cart 2'
        //     },
        //     {
        //         score:10 , value : 'cart 3'
        //     }  
        // ])

        // const getTopCartItems = await client.zRange("cart",0,-1)
        // console.log(getTopCartItems)

        // const extractcartitemswithscore = await client.zRangeWithScores(
        //     "cart",0,-1
        // )
        // console.log(extractcartitemswithscore)

        // //rank one
        // const carrtTwoRank = await client.zRank('cart','cart 1')
        // console.log(carrtTwoRank)

        //Hashes -> HSET,HGET,hdel,hgetall

        await client.hSet('product:1',{
            name:'Product 1',
            description : 'product desc',
            rating : '5'
        })

        const getProductrating = await client.hGet('product:1','rating')
        console.log(getProductrating)

        
    } catch (e) {
        console.log(e)
        
    } finally {
        client.quit()
    }
}

redisDatastructure()