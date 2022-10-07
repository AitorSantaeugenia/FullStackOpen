import { useState, useEffect } from "react";
import "./App.css";
import FilterForm from "./components/FilterForm";
import Form from "./components/Form";
import PersonData from "./components/PersonData";
import Notification from "./components/Notification";
import services from "./services/services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  //msg null to add the value later and back to null after 3 secs
  const [addingMsg, setAddingMsg] = useState(null);

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

    const updatePerson = persons.find(
      (person) => person.name.toLowerCase() === newObject.name.toLowerCase()
    );

    if (updatePerson && updatePerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
    } else if (updatePerson && updatePerson.number !== newNumber) {
      const confirm = window.confirm(
        `${updatePerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const updatedPerson = { ...updatePerson, number: newNumber };
        services.update(updatePerson.id, updatedPerson).then((response) => {
          // console.log(response);
          setPersons(
            persons.map((person) =>
              person.id !== updatePerson.id ? person : response.data
            )
          );
        });
      }
    } else if (newObject.name === "") {
      alert(`Please insert a correct name.`);
    } else {
      services.create(newObject).then((response) => {
        setPersons(persons.concat(response.data));
        //we show msg and after 3 secs, null again
        setAddingMsg(`Added ${response.data.name}`);
        setTimeout(() => {
          setAddingMsg(null);
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
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
      <Notification message={addingMsg} />
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
          {/* {console.log(persons)} */}
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
