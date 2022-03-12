import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/personsService";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [isFetchedData, setIsFetchedData] = useState(false);
  const [message, setMessage] = useState(null);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  // Error message handler
  const handleErrorMessage = (name, err) => {
    setMessage(`Error: ${name} ${err}`);
    setIsErrorMessage(true);
    setTimeout(() => {
      setMessage(null);
      setIsErrorMessage(false);
    }, 2000);
  };

  // Normal message handler
  const handleMessage = (name, msg) => {
    setMessage(`Action: ${name} ${msg}`);
    setTimeout(() => setMessage(null), 2000);
  };

  // Fetch data from server
  const getAll = () => {
    personsService
      .getAll()
      .then((allData) => {
        setPersons(allData);
        setIsFetchedData(true);
      })
      .catch((response) => handleErrorMessage(JSON.stringify(response), "something went wrong while fetching"));
  };
  useEffect(getAll, []);

  // Handle form submit
  const handleForm = (e) => {
    e.preventDefault();
    const toAdd = {
      name: newName,
      number: newNumber,
    };
    const sameNameAndNumber = persons.find(
      (person) => person.name === toAdd.name && person.number === toAdd.number
    );
    const sameNameDifferentNumber = persons.find(
      (person) => person.name === toAdd.name && person.number !== toAdd.number
    );
    sameNameAndNumber && handleErrorMessage(toAdd.name, "is already added to phonebook!");

    // Case 1 - person doesn't exist
    !sameNameAndNumber &&
      !sameNameDifferentNumber &&
      personsService
        .createPerson(toAdd)
        .then((addedData) => {
          console.log("added data:", addedData);
          setPersons(persons.concat(addedData));
          setMessage(`Added ${toAdd.name}!`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => setMessage(null), 2000);
        })
        .catch((response) => handleErrorMessage("oops,", "something went wrong!"));

    // Case 2 - person exists but replace number
    sameNameDifferentNumber &&
      window.confirm(
        `${toAdd.name} is already added to phonebook! Would you like to replace the old number with the new one?`
      ) &&
      personsService
        .updatePerson(sameNameDifferentNumber.id, toAdd)
        .then((updatedData) => {
          console.log("update ok", updatedData);
          const rest = persons.filter((person) => person.id !== updatedData.id);
          setPersons(rest.concat(updatedData));
          handleMessage(toAdd.name, `Updated ${updatedData.name}'s new number!`);
        })
        .catch((response) => handleErrorMessage("oops,", "something went wrong!"));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} isErrorMessage={isErrorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />

      <h3>Add a new</h3>

      <PersonForm
        handleForm={handleForm}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        setPersons={setPersons}
        personsService={personsService}
        isFetchedData={isFetchedData}
        newFilter={newFilter}
      />
    </div>
  );
};

export default App;
