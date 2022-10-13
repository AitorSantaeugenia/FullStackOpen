const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var morgan = require("morgan");
const Person = require("./models/Person");

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

//we will change this later prob
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  console.log(body.name);
  console.log(body.number);

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "Name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      console.log("test", savedPerson);
      response.json(savedPerson);
    })
    .catch((error) => console.log(`Error: ${error}`));
});

app.get("/api/persons/:id", (request, response) => {
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
  console.log(request.params.id);

  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
