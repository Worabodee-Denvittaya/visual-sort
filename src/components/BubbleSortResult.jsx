import React from "react";

const BubbleSortResult = props => {
  const style = {
    margin: 0,
    padding: 0,
    backgroundColor: "#8BCCFE",
    fontSize: "45px",
    borderStyle: "solid",
    borderWidth: "5px",
    width: "100%"
  };

  return (
    <ul id="array">
      {this.props.array.map((element, key) => (
        <li className="element" key={key}>
          <div style={style}>{element}</div>
        </li>
      ))}
    </ul>
  );
};

export default BubbleSortResult;
