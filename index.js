const { json } = require("express")
const express = require("express")
const bodyParser = require("body-parser")

var morgan = require("morgan")
 


const app = express()

app.use(bodyParser.json())

morgan.token("body", function(req, res){
    const toReturn = req.body
    return JSON.stringify(toReturn)
})

app.use(morgan(":method :url :status :body"))

const baseUrl = "http://localhost:3001/persons"


const generateId = () =>{
    return Math.floor(Math.random() * 10000)
}

let persons = 
[
      {
        "name": "Arto Hellas",
        "number": "200-244143",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Tom Scott",
        "number": "349953",
        "id": 3
      },
      {
        "name": "Ridley Norbert",
        "number": "99930045",
        "id": 4
      },
      {
        "name": "Ram",
        "number": "355934",
        "id": 7
      },
      {
        "name": "Tim",
        "number": "399459",
        "id": 8
      }
    ]

app.get("/api/info", (request, response) =>{
    const len = persons.length
    response.send(`<p>Phonebook has info for ${len} people</p>
    <p>${new Date()}</p>`)
})

app.get("/api/persons", (request, response) =>{
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) =>{
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person){
        return response.json(person)
    }else{
        return response.status(404).end()
    }
})

app.delete("/api/persons/:id",(request, response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(persons[id -1])
    console.log(`Person number ${id} deleted ${typeof id}`)
    response.status(204).end()
})

app.post("/api/persons", (request, response) =>{
    const body = request.body
    if (!body.name){
        return response.status(400).json({
            error: "Name is missing"
        })
    }else if(!body.number){
        return response.status(404).json({
            error:"Number is missing"
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }


    if (persons.map(p => p.name).includes(person.name)){
        return response.status(400).json({
            error: "That name already exists in the phonebook"
        })
    }
    
    morgan.token("tiny", (req, res) =>{return req.headers["application/json"]})

    persons = persons.concat(person)

    response.json(person).status(200).end()
})

const PORT  = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)