import { useState } from "react";

function App() {
  const operators = ["constant", "argument", "and", "or"];
  const [selectedOperator, setSelectedOperator] = useState("");

  const [selectedConstant, setSelectedConstant] = useState(true);

  const [args, setArgs] = useState([
    {
      name: "myArg",
      value: true,
    },
  ]);

  const addNewArg = () => {
    setArgs([
      ...args,
      {
        name: "",
        value: false,
      },
    ]);
  };

  return (
    <div>
      {args.map((arg, index) => (
        <div key={index}>
          <input
            type="text"
            value={arg.name}
            onChange={(e) => {
              const val = e.target.value;
              const newArgs = args.map((item, i) =>
                i === index ? { ...item, name: val } : item
              );
              setArgs(newArgs);
            }}
          ></input>
          <select
            value={arg.value}
            onChange={(e) => {
              const val = e.target.value === "true" ? true : false;
              const newArgs = args.map((item, i) =>
                i === index ? { ...item, value: val } : item
              );
              setArgs(newArgs);
            }}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      ))}
      <button onClick={addNewArg}>Add Arg</button>

      <br />
      <br />
      <br />
      <br />

      {selectedOperator === "constant" ? (
        <select
          value={selectedConstant}
          onChange={(e) => {
            setSelectedConstant(e.target.value === "true" ? true : false);
          }}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ) : null}
      
      {selectedOperator === "" ? (
        <select
          value={selectedOperator}
          onChange={(e) => {
            setSelectedOperator(e.target.value);
          }}
        >
          <option value="">select</option>
          {operators.map((operator) => {
            return (
              <option key={operator} value={operator}>
                {operator}
              </option>
            );
          })}
        </select>
      ) : null}
      <button
        onClick={(e) => {
          setSelectedOperator("");
        }}
      >
        x
      </button>
    </div>
  );
}

export default App;
