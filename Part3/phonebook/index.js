const express = require("express");
require("dotenv").config();

const app = express();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  console.log(newPerson.name);
  console.log(newPerson.number);

  if (!newPerson.name || !newPerson.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  } else if (Person.find({ name: newPerson.name })) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: newPerson.name,
    number: newPerson.number,
  };

  // persons = persons.concat(person);

  person.save().then((savedContact) => {
    response.json(savedContact);
  });
});

app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);

  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  const currentDate = new Date().toString();

  Person.find({}).then((persons) => {
    response.send(
      `<div>
            <p>Phonebook has info for ${persons.length} people</p>
        </div>
        <div>
            <p>${currentDate}</p>
        </div>`
    );
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
