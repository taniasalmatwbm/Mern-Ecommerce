const mongoose = require('mongoose')

const connectdatabase =()=>{
   
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log(`connect with mongodb server`)
       }).catch((err)=>{
           console.log(err)
       })
}
module.exports = connectdatabase