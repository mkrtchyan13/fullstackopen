export const Persons = ({ filteredPersons, handleDelete }) => {
  return filteredPersons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number} {"   "}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </p>
  ));
};
