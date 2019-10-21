import React, { Component } from "react";
import "./ArrayInput.css";

class ArrayInput extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  toNumber(stringArray) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const lastChar = stringArray.charAt(stringArray.length - 1);

    if (numbers.includes(lastChar)) {
      const numberArray = stringArray.split(",").map(Number);
      this.props.setInitialArray(numberArray);
    } else {
      return;
    }
  }

  handleChange(event) {
    if (event.which === 13) {
      this.toggleHidden();
    } else {
      this.props.isNotSorting();
      this.props.isNotSorted();
      const stringArray = event.target.value;
      this.toNumber(stringArray);
    }
  }

  render() {
    return (
      <div
        className="dropdown-content"
        id="myDropdown"
        disabled={!this.props.sorted}
      >
        <input
          type="text"
          placeholder="e.g: 1, 2, 3, 4"
          onKeyUp={this.handleChange}
        />
      </div>
    );
  }
}

export default ArrayInput;
