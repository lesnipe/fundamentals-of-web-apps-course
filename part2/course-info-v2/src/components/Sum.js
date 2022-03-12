const Sum = ({ parts }) => {
  let total = parts
    .map((part) => part.exercises)
    .reduce((prev, curr) => prev + curr);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Sum;
