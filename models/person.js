const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.MONGODB_URL

console.log(`Connecting to ${url}`);

mongoose.connect(url, {useNewUrlParser:true, useFindAndModify:false, useUnifiedTopology:true, useCreateIndex:true})
.then(response =>{
    console.log(`Successfully connected to ${url}`)    
})
.catch(error =>{
    console.log(`Error connecting to ${url}: ${error.message}`);
})

const personSchema = new mongoose.Schema({
    name:String,
    number:String
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }}    
)

module.exports = mongoose.model("Person", personSchema)