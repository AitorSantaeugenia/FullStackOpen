const Form = ({
    addNewPerson,
    newName,
    handleNewName,
    newNumber,
    handlePhoneNumber,
  }) => (
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
  );

  export default Form;