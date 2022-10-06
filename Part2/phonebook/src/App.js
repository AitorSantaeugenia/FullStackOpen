import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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
    console.log("e", e.target.value);

    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          <span className="spanPaddingRight">name:</span>{" "}
          <input
            value={newName}
            onChange={handleNewName}
            className="inputMarginLeft"
          />
        </div>
        <div>
          <span className="spanPaddingRight">number:</span>{" "}
          <input value={newNumber} onChange={handlePhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <tr>
          <td key={person.name} className="tdPadding">
            {person.name}
          </td>
          <td key={person.number} className="tdPaddingLeft">
            {person.number}
          </td>
        </tr>
      ))}
    </div>
  );
};

export default App;
