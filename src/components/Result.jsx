import React from "react";
import "./Array.css";

const Result = props => {
  const style = {
    margin: 0,
    padding: 0,
    backgroundColor: "#8BCCFE",
    fontSize: "45px",
    borderStyle: "solid",
    borderWidth: "5px",
    width: "100%"
  };

  const sorted = {
    margin: 0,
    padding: 0,
    backgroundColor: "#82F57F",
    fontSize: "45px",
    borderStyle: "solid",
    borderWidth: "5px",
    width: "100%"
  };

  const purple = {
    margin: 0,
    padding: 0,
    backgroundColor: "#C338FE",
    fontSize: "45px",
    borderStyle: "solid",
    borderWidth: "5px",
    width: "100%"
  };

  if (!props.sorting) {
    return (
      <ul id="array">
        {props.initialArray.map((element, key) => (
          <li className="element" key={key}>
            <div style={style}>{element}</div>
          </li>
        ))}
      </ul>
    );
  } else if (props.algo === "bubble") {
    if (props.sorted === false) {
      return (
        <ul id="array">
          {props.bubbleArray.map((element, key) => (
            <li className="element" key={key}>
              <div style={key === props.bubbling ? purple : style}>
                {element}
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul id="array">
          {props.bubbleArray.map((element, key) => (
            <li className="element" key={key}>
              <div style={sorted}>{element}</div>
            </li>
          ))}
        </ul>
      );
    }
  } else if (props.algo === "merge") {
    const upper = props.upper;
    const lower = props.lower;

    return (
      <div>
        <ul id="array">
          {upper.map((element, key) => (
            <li className="element" key={key}>
              <div style={props.sorted ? sorted : style}>
                {Number.isInteger(element) ? element : " "}
              </div>
            </li>
          ))}
        </ul>
        <ul id="array">
          {lower.map((element, key) => (
            <li className="element" key={key}>
              <div style={props.sorted ? sorted : style}>
                {Number.isInteger(element) ? element : " "}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (props.algo === "quick") {
    if (props.sorted === false) {
      return (
        <div>
          <ul id="array">
            {props.upper.map((element, key) => (
              <li className="element" key={key}>
                <div style={key === props.pivot ? purple : style}>
                  {Number.isInteger(element) ? element : " "}
                </div>
              </li>
            ))}
          </ul>
          <ul id="array">
            {props.lower.map((element, key) => (
              <li className="element" key={key}>
                <div style={key === props.lowerPivot ? purple : style}>
                  {Number.isInteger(element) ? element : " "}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <ul id="array">
          {props.upper.map((element, key) => (
            <li className="element" key={key}>
              <div style={sorted}>{element}</div>
            </li>
          ))}
        </ul>
      );
    }
  }
};

export default Result;
