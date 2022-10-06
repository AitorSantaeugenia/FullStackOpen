import { useState } from "react";
import "./App.css";

const App = () => {
  // Commented previous object with one person
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  // ]);

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
      <form>
        <div>
          filter shown with <input value={filter} onChange={handleFilter} />
        </div>
      </form>
      <form onSubmit={addNewPerson}>
        <div>
          <h2>Add a new person</h2>
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
      <table>
        <tbody>
          {persons
            .filter((value) => {
              return value.name.toLowerCase().includes(filter.toLowerCase())
                ? value
                : null;
            })
            .map((person) => (
              <>
                {console.log(person.name)}
                <tr>
                  <td key={person.name} className="tdPadding">
                    {person.name}
                  </td>
                  <td key={person.number} className="tdPaddingLeft">
                    {person.number}
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
