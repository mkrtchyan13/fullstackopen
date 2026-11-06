import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";
import {
  ErrorNotification,
  SuccessNotification,
} from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPeople) => setPersons(initialPeople));
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const number = newNumber.trim();
    if (name !== "" && number !== "") {
      const existingPerson = persons.find((person) => person.name === name);
      if (existingPerson) {
        const changePersonNumber = { ...existingPerson, number: number };
        if (
          window.confirm(
            `${name} is already added to the phonebook, replace the old number with a new one?`,
          )
        ) {
          personService
            .update(existingPerson.id, changePersonNumber)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === existingPerson.id ? returnedPerson : person,
                ),
              );
              setSuccessMessage(`Updated ${name}`);
              setTimeout(() => setSuccessMessage(null), 5000);
              setNewName("");
              setNewNumber("");
            })
            .catch(() => {
              setErrorMessage(
                `Information of ${name} has already been removed from the server`,
              );
              setTimeout(() => setErrorMessage(null), 5000);
              setPersons(
                persons.filter((person) => person.id !== existingPerson.id),
              );
            });
        }
      } else {
        const personObject = {
          name: name,
          number: number,
        };
        personService.create(personObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${name}`);
          setTimeout(() => setSuccessMessage(null), 5000);
          setNewName("");
          setNewNumber("");
        });
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (personObject) => {
    if (window.confirm(`Delete ${personObject.name} ?`)) {
      personService
        .remove(personObject.id)
        .then(() =>
          setPersons(persons.filter((person) => person.id !== personObject.id)),
        )
        .catch(() => {
          setErrorMessage(
            `Information of ${personObject.name} has already been removed from the server`,
          );
          setTimeout(() => setErrorMessage(null), 5000);
          setPersons(persons.filter((person) => person.id !== personObject.id));
        });
    }
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={filter} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
