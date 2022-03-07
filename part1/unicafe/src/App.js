import { useState } from "react";

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, action, values, setTotal }) => {
  return (
    <button
      onClick={() => {
        action(values[text] + 1);
        setTotal(values.total + 1);
      }}
    >
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ values }) => {
  if (values.total != 0)
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={values.good} />
            <StatisticLine text="neutral" value={values.neutral} />
            <StatisticLine text="bad" value={values.bad} />
            <StatisticLine text="all" value={values.total} />
            <StatisticLine
              text="average"
              value={(values.good - values.bad) / values.total}
            />
            <StatisticLine
              text="positive"
              value={(values.good * 100) / values.total + " %"}
            />
          </tbody>
        </table>
      </div>
    );
  else return <p>No feedback given</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const values = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
  };

  return (
    <div>
      <Title text="Give Feedback" />
      <Button
        text="good"
        values={values}
        action={setGood}
        setTotal={setTotal}
      />
      <Button
        text="neutral"
        values={values}
        action={setNeutral}
        setTotal={setTotal}
      />
      <Button text="bad" values={values} action={setBad} setTotal={setTotal} />
      <Title text="Statistics" />
      <Statistics values={values} />
    </div>
  );
};

export default App;
