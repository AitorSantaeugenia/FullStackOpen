const PersonData = (person) => (
    <tr>
      <td key={person.name} className="tdPadding">
        {person.name}
      </td>
      <td key={person.number} className="tdPaddingLeft">
        {person.number}
      </td>
    </tr>
  );

  export default PersonData;