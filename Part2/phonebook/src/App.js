import { useState } from "react";
import "./App.css";
import FilterForm from "./components/FilterForm";
import Form from "./components/Form";
import PersonData from "./components/PersonData";

const App = () => {
  //New object with more persons
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addNewPerson = (e) => {
    e.preventDefault();

    console.log(newNumber);

    const newObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newObject.name === "") {
      alert(`Please insert a correct name.`);
    } else {
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNewName = (e) => {
    e.preventDefault();

    setNewName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    e.preventDefault();
    // console.log("e", e.target.value);

    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilter={handleFilter} />
      <Form
        addNewPerson={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handlePhoneNumber={handlePhoneNumber}
      />

      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons
            .filter((value) => {
              return value.name.toLowerCase().includes(filter.toLowerCase())
                ? value
                : null;
            })
            .map((person) => (
              <PersonData name={person.name} number={person.number} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
