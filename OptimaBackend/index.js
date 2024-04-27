require('dotenv').config()

const express = require('express')
const cors =require('cors')
const prisma = require('./prisma/prismaClient')
//express app
const app = express();
const PORT = process.env.PORT;


//routers
const userRouter = require('./routes/user')

async function main(){

//middlewares
app.use(cors())
app.use(express.json())

//registering api routes
app.use('/api/user',userRouter)


//test routes
app.get('/api/table',async (req,res)=>{
await prisma.user.deleteMany()
res.send('sus')
})
app.get('/api/allusers',async (req,res)=>{
    const users = await prisma.user.findMany()
res.json(users)
})


//catching unregistered routes
app.all("*",(req,res)=>{
    res.status(404).json({error:`Route ${req.originalUrl} not found`})
})

//Listening for requrests
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

}

main().then(async ()=>{
    await prisma.$connect()
}).catch(async(e)=>{
    console.log(e)
    await prisma.$disconnect()
    process.exit(1);

})





