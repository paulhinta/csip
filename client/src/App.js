import React, { useState, useEffect } from "react";
import { InputForm } from "./Component/InputForm";

import "./App.css";

import { cssColor, getTheme } from "@fluentui/react";

const theme = getTheme();

function App() {
  useEffect(() => {
    document.title = "COVID-19 stringency index predictor";
  }, []);

  const [data, setData] = useState([]);
  const getData = () => {
    fetch("http://localhost:5000/output", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="center">
      <div className="wrapper center">
        <h1>COVID-19 Stringency Index Predictor</h1>
        <h2>Using AI to predict how strict public health measures should be</h2>
        <h4>
          For your chosen country, select the values for the public health
          performance indices below and get the corresponding policy
          recommendation based on the predicted Stringency index! This is a
          novel AI that recommends the level of public health restrictions,
          making policymaking easier and more reliable.
        </h4>
      </div>
      <div
        className="wrapper center"
        style={{ boxShadow: theme.effects.elevation4 }}
      >
        <InputForm>Input</InputForm>
      </div>
      <div
        className="wrapper center"
        style={{ boxShadow: theme.effects.elevation4 }}
      >
        {typeof data.output === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.output.map((output, i) => (
            <h2 className="center text-center" key={i}>
              {output}
            </h2>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
