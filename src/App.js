import "./styles.css";
import { useState } from "react";

const satisfied = [
  {
    text: "Dissatisfeid",
    percentage: 0,
  },
  {
    text: "It was okay",
    percentage: 5,
  },
  {
    text: "It was good",
    percentage: 10,
  },
  {
    text: "Absolutely amazing!",
    percentage: 20,
  },
];

export default function App() {
  const [selectedPercentage, setSelectedPercentage] = useState(0);
  const [selectedFriendPercentage, setSelectedFriendPercentage] = useState(0);
  const [billValue, setBillValue] = useState("");

  function handlePercentageChange(percentage) {
    setSelectedPercentage(percentage);
  }

  function handleFriendPercentageChange(percentage) {
    setSelectedFriendPercentage(percentage);
  }

  function handleChangeBill(e) {
    setBillValue(e.target.value);
    return e;
  }

  return (
    <div>
      <BillValue value={billValue} metodo={handleChangeBill}>
        <p>How much was the bill?</p>
      </BillValue>

      <Service data={satisfied} functionPercentage={handlePercentageChange}>
        <p>How did you like the service?</p>
      </Service>

      <Service
        data={satisfied}
        functionPercentage={handleFriendPercentageChange}
      >
        <p>How did your friend like the service?</p>
      </Service>

      <TotalPay
        billValue={billValue}
        selectedPercentage={selectedPercentage}
        selectedFriendPercentage={selectedFriendPercentage}
      />
    </div>
  );
}

function Service({ data, functionPercentage, children }) {
  function handleChange(e) {
    const selectedOption = data.find(
      (dataSelected) => dataSelected.text === e.target.value
    );

    functionPercentage(selectedOption.percentage);
  }

  return (
    <div>
      <label htmlFor="satisfaction">{children}</label>
      <select id="satisfaction" onChange={handleChange}>
        {data.map((dataSelected) => (
          <option key={dataSelected.text} value={dataSelected.text}>
            {dataSelected.text}
          </option>
        ))}
      </select>
    </div>
  );
}

function BillValue({ billValue, metodo, children }) {
  return (
    <div>
      <form>
        <label htmlFor="bill">{children}</label>
        <input type="text" id="bill" value={billValue} onChange={metodo} />
      </form>
    </div>
  );
}

function TotalPay({ billValue, selectedPercentage, selectedFriendPercentage }) {
  const bill = parseFloat(billValue) || 0;
  const totalPercentage =
    parseFloat(selectedPercentage + parseFloat(selectedFriendPercentage)) / 2;

  const totalPay = bill + (bill * totalPercentage) / 100;

  return (
    <div>
      <p>{`You pay $${totalPay.toFixed(2)}`}</p>
    </div>
  );
}
