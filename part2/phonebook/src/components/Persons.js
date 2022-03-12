import PersonDetails from "./PersonDetails";

const Persons = ({ persons, setPersons, personsService, newFilter, isFetchedData }) => {
  return (
    <div>
      {isFetchedData ? (
        persons
          .filter((person) =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
          )
          .map((person) => (
            <PersonDetails
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
              persons={persons}
              setPersons={setPersons}
              personsService={personsService}
            />
          ))
      ) : (
        <p>Getting Data...</p>
      )}
    </div>
  );
};

export default Persons;
