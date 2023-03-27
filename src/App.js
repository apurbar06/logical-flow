import { useState, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import evalExpration from "./calculate";

const Operator = {
  constant: "constant",
  argument: "argument",
  and: "and",
  or: "or",
};
const operators = ["constant", "argument", "and", "or"];
const initalArg = {
  id: uuidv4(),
  name: "myArg",
  value: true,
};
function App() {
  const [state, setState] = useState({});

  const [args, setArgs] = useState([initalArg]);

  const addNewArg = () => {
    setArgs([
      ...args,
      {
        id: uuidv4(),
        name: "newarg",
        value: false,
      },
    ]);
  };

  const result = evalExpration(state, args);
  console.log("result", result, args);

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
      <RenderOperators state={state} setState={setState} args={args} />
      <br />
      <br />
      <br />

      <label>result: {result ? "true" : "false"}</label>
      <br />
      <br />
      <br />

      {/* <pre>state:{JSON.stringify(state, null, 4)}</pre>
      <pre>args:{JSON.stringify(args, null, 4)}</pre> */}
    </div>
  );
}

const RenderOperators = ({ state, setState, args = [], path = [] }) => {
  const appState = state;
  const operator = appState.type;

  const NestedComponents = Array.isArray(appState.value) ? (
    <div style={{ marginLeft: "10px" }}>
      {appState.value.map((elem, index) => {
        // --
        const nestedPath = [...path, index];
        const _setState = (newState) => {
          if (typeof newState === "function") {
            console.log("if _setState", nestedPath, newState);
            setState(newState);
          } else {
            console.log("else _setState", nestedPath, newState);
            setState((currentAppGlobalState) =>
              recursiveUpdate(currentAppGlobalState, nestedPath, newState)
            );
          }
        };
        // --
        return (
          <Fragment key={JSON.stringify(nestedPath)}>
            <RenderOperators
              state={elem}
              setState={_setState}
              args={args}
              path={nestedPath}
            />
          </Fragment>
        );
      })}
      <button
        onClick={(e) => {
          setState({ type: state.type, value: [...state.value, {}] });
        }}
      >
        + add op
      </button>
    </div>
  ) : null;

  if (operator === Operator.constant)
    return (
      <div>
        <select
          value={appState.value}
          onChange={(e) => {
            const value = e.target.value === "true" ? true : false;
            setState({ type: Operator.constant, value: value });
          }}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <button
          onClick={(e) => {
            setState({});
          }}
        >
          x
        </button>
      </div>
    );

  if (operator === Operator.argument)
    return (
      <div>
        <select
          value={appState.value}
          onChange={(e) => {
            const id = e.target.value;
            setState({ type: Operator.argument, value: id });
          }}
        >
          {args.map((arg) => {
            return (
              <option key={arg.name} value={arg.id}>
                {arg.name}
              </option>
            );
          })}
        </select>
        <button
          onClick={(e) => {
            setState({});
          }}
        >
          x
        </button>
      </div>
    );

  if (operator === Operator.and)
    return (
      <div>
        <select
          value={Operator.and}
          onChange={(e) => {
            const selected_operator = e.target.value;
            if (selected_operator === Operator.or)
              setState({ type: Operator.or, value: [{}, {}] });
          }}
        >
          <option value="and">and</option>
          <option value="or">or</option>
        </select>
        <button
          onClick={(e) => {
            setState({});
          }}
        >
          x
        </button>
        {NestedComponents}
      </div>
    );

  if (operator === Operator.or)
    return (
      <div>
        <select
          value={Operator.or}
          onChange={(e) => {
            const selected_operator = e.target.value;
            if (selected_operator === Operator.and)
              setState({ type: Operator.and, value: [{}, {}] });
          }}
        >
          <option value="and">and</option>
          <option value="or">or</option>
        </select>
        <button
          onClick={(e) => {
            setState({});
          }}
        >
          x
        </button>
        {NestedComponents}
      </div>
    );

  return (
    <div>
      <select
        value={operator || ""}
        onChange={(e) => {
          const op = e.target.value;
          if (op === Operator.constant) {
            setState({ type: Operator.constant, value: false });
          } else if (op === Operator.argument) {
            setState({ type: Operator.argument, value: args[0].id });
          } else if (op === Operator.and) {
            setState({ type: Operator.and, value: [{}, {}] });
          } else if (op === Operator.or) {
            setState({ type: Operator.or, value: [{}, {}] });
          }
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
      <button
        onClick={(e) => {
          setState({});
        }}
      >
        x
      </button>
    </div>
  );
};

const recursiveUpdate = (initialState, path = [], newValue) => {
  if (path.length === 0) {
    return newValue;
  }

  const index = path[0];
  const rest = path.slice(1);
  const current = initialState;

  if (current.type === Operator.and) {
    const value = current.value.slice();
    value[index] = recursiveUpdate(value[index], rest, newValue);
    return { type: Operator.and, value };
  }

  if (current.type === Operator.or) {
    const value = current.value.slice();
    value[index] = recursiveUpdate(value[index], rest, newValue);
    return { type: Operator.or, value };
  }

  throw new Error("Invalid path");
};

export default App;
