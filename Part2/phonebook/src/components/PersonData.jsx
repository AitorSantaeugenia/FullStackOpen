const PersonData = ({person, handleDelete}) => (
  
    <tr>
      <td key={person.name} className="tdPadding">
        {person.name}
      </td>
      {/* we added the id to check it easier into the db.json */}
      <td key={person.id} className="tdPadding">
        id: {person.id}
      </td>
      <td key={person.number} className="tdPaddingLeft">
        {person.number}
      </td>
      <td className="tdPaddingLeft">
        <button className="btnPhonebook" onClick={() => handleDelete(person.id)}>Remove</button>
      </td>
    </tr>
  );

  export default PersonData;