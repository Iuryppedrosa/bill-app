import "./styles.css";
import { useState } from "react";

export default function App2() {
  return (
    <div className="App2">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  function resetAll() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }

  const tip = (bill * ((percentage1 + percentage2) / 2)) / 100;
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectedPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the Service?{" "}
      </SelectedPercentage>
      <SelectedPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the Service?{" "}
      </SelectedPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onClick={resetAll} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectedPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0"> Dissatisfied (0%) </option>
        <option value="5"> It was okay (5%) </option>
        <option value="10"> It was good (10%) </option>
        <option value="20"> Absolutely amazing! (20%) </option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      <h2>
        You pay {bill + tip} (${bill} + ${tip})
      </h2>
    </div>
  );
}

function Reset({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>Reset</button>
    </div>
  );
}
