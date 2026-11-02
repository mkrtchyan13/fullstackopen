import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>;
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}:</td>
      <td>{props.value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  const sum = 1 * good + 0 * neutral + -1 * bad;
  const total = good + neutral + bad;
  const average = total > 0 ? sum / total : 0;
  const percentage = total > 0 ? (good / total) * 100 : 0;
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text={"Good"} value={good} />
          <StatisticsLine text={"Neutral"} value={neutral} />
          <StatisticsLine text={"Bad"} value={bad} />
          <StatisticsLine text={"All"} value={total} />
          <StatisticsLine text={"Average"} value={average} />
          <StatisticsLine text={"Positive"} value={percentage + "%"} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleClickGood} name="Good" />
      <Button onClick={handleClickNeutral} name="Neutral" />
      <Button onClick={handleClickBad} name="Bad" />

      {total > 0 && <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;
