const PersonForm = ({
  handleForm,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          Name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Αdd</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
