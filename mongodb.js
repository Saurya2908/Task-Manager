const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL= 'mongodb://127.0.0.1:27017'
const databaseName= 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlparser:true}, (error,client)=>{
    if(error){
        console.log('Unable to connect!')
    }

    const db=client.db(databaseName)

    // db.collection('users').insertOne({
    //     Name :'Sourav',
    //     Age : 23
    // },(error,result)=>{
    //     if(error){
    //         return console.log('unable to insert user!')
    //     }

    //     console.log(result)

    // })

    db.collection('tasks').insertMany([
        {
            description:'Work',
            completed: false 
        },
        {
            description:'cooking',
            completed: false 
        },
        {
            description:'sleeping',
            completed: false 
        }
    ],(error,result)=>{
        if(error){
            console.log('unable to insert tasks!')
        }
        console.log(result)
    })
})

// db.collection('tasks').updateMany(
//     {completed:false},
//     {
//         $set:{
//             completed:true
//         }
    
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })



