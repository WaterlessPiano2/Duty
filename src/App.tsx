import React from "react";
import "./App.css";
import Calculator from "./calc";

function App() {
  return (
    <div className="App">
      <h3 className="App-title">Duty Calculator</h3>
      <p>
        NOTE: This is still work in progress, there may be errors! All
        information on this site are to be used as a guidelines only. I accept
        no liability for any damages resulting from the usage of this
        calculator.
      </p>
      <Calculator />
    </div>
  );
}

export default App;
