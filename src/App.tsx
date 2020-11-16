import React from "react";
import "./App.css";
import Calculator from "./calc";

function App() {
  return (
    <div className="App">
      <h3 className="App-title">Duty Calculator</h3>
      <div className="top-text">
        Please let me know what you think by either filling in the{" "}
        <a
          className="link"
          href="https://forms.gle/Ltko7f1pB4E6dv58A"
          target="_blank"
          rel="noopener noreferrer"
        >
          feedback form
        </a>{" "}
        or by contacting me on{" "}
        <a
          className="link"
          href="https://www.linkedin.com/in/chadderya/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin!{" "}
        </a>
        The Code for this calculator is openly available on{" "}
        <a
          className="link"
          href="https://github.com/WaterlessPiano2/Duty"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github!{" "}
        </a>
      </div>
      <Calculator />
      <p>
        NOTE: This is still work in progress, there may be errors! All
        information on this site are to be used as a guidelines only. I accept
        no liability for any damages resulting from the usage of this
        calculator.
      </p>
    </div>
  );
}

export default App;
