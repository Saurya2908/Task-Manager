const mongoose=require('mongoose')
const validator=require('validator')


const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not a valid email!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:7,
        lowercase:true,
        validate(value){
            if(value=='password'){
                throw new Error('Password cannot contain password!')
            }
        }

    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Enter a positive age!')
            }
        }
    }
})

module.exports=User