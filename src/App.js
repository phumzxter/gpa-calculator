import { useReducer } from "react";
import GpaContext from "./GpaContext";
import { initialState } from "./GpaContext/initialState";
import Home from "./Pages/Home";
import { reducer } from "./GpaContext/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GpaContext.Provider value={{ records: state, dispatch }}>
      <Home />
    </GpaContext.Provider>
  );
}

export default App;
