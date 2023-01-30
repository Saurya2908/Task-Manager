const express=require('express')
require("./db/mongoose")

const userRoutes=require('./routers/user')
const taskRoutes=require('./routers/task')

const app=express()
const port=process.env.PORT||3000

app.use(express.json())
app.use(userRoutes,taskRoutes)





app.listen(port,()=>{
    console.log('server is running on port '+ port)
})