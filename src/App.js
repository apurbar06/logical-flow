import { useState } from "react";

function App() {
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

    </div>
  );
}

export default App;
