const Filter = ({ newFilter, setNewFilter }) => {
  return (
    <div>
      Filter shown with{" "}
      <input value={newFilter} onChange={(e) => setNewFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
