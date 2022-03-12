const PersonDetails = ({
  id,
  name,
  number,
  persons,
  setPersons,
  personsService,
}) => {
  const deleteHandler = (id) => {
    window.confirm(`Are you sure you want to delete ${name} with id ${id}?`) &&
      personsService
        .deletePerson(id)
        .then((data) => {
          console.log("deleted ok");
          setPersons(persons.filter((person) => person.id != id));
        })
        .catch((response) => alert(`Error: ${response}`));
  };

  return (
    <p>
      {id}) {name} &#9743; {number}
      {"  "}
      <button onClick={() => deleteHandler(id)}>Delete</button>
    </p>
  );
};

export default PersonDetails;
