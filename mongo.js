const mongoose = require("mongoose")

if (process.argv.length < 3){
    console.log(`please enter password as an argument: node mongo.js <password>`);
    process.exit(1)
    
}
const password = process.argv[2]

const uri = `mongodb+srv://backenduser:${password}@cluster0.lansk.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name:String,
    number:String,
})

const Person = mongoose.model("Person", personSchema)

let newName = ""
let newNumber = ""

if (process.argv.length > 4){
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    newName = process.argv[3]
    newNumber = process.argv[4]

    const person = new Person({
        name:newName,
        number:newNumber
    })

    person.save().then(result =>{
        console.log(`Person ${newName} has been saved to the phonebook!`);
        mongoose.connection.close()
        
    })
}

if (process.argv.length <4){
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    console.log('Phonebook:');
    
    Person.find({}).then(persons => {
        persons.forEach(person => {
          console.log(`name: ${person.name}, number: ${person.number}`)
        })
        mongoose.connection.close()
      })
}




