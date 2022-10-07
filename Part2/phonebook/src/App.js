import { useState, useEffect } from "react";
import "./App.css";
import FilterForm from "./components/FilterForm";
import Form from "./components/Form";
import PersonData from "./components/PersonData";
import services from "./services/services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    services.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addNewPerson = (e) => {
    e.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newObject.name)) {
      alert(`${newName} is already added to phonebook`);
    } else if (newObject.name === "") {
      alert(`Please insert a correct name.`);
    } else {
      services.create(newObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNewName = (e) => {
    e.preventDefault();

    setNewName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    e.preventDefault();

    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    const deletePerson = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${deletePerson.name}?`);

    if (confirm) {
      services.remove(id).then((toRemovePerson) => {
        persons.map((person) => (person.id !== id ? person : toRemovePerson));
      });
      setPersons(persons.filter((person) => person.id !== id));
    }
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
              <PersonData person={person} handleDelete={handleDelete} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
