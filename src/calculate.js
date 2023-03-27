const evalExpration = (state, args = []) => {
  if (state.type === undefined) {
    // this is the case when the state is empty at top level
    return "";
  }

  if (state.type === "constant") {
    return state.value;
  }
  if (state.type === "argument") {
    const arg = args.find((a) => a.id === state.value);
    return arg.value;
  }
  if (state.type === "and") {
    const filteredStateValue = state.value.filter(
      (elem) => elem.type !== undefined
    );
    const values = filteredStateValue.map((elem) => evalExpration(elem, args));
    return values.every((val) => val === true);
  }
  if (state.type === "or") {
    const filteredStateValue = state.value.filter(
      (elem) => elem.type !== undefined
    );
    const values = filteredStateValue.map((elem) => evalExpration(elem, args));
    return values.some((val) => val === true);
  }

  throw new Error("Some case not handled", state);
};

export default evalExpration;
