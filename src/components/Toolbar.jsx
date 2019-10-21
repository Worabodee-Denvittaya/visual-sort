import React, { Component } from "react";
import "./Toolbar.css";

class Toolbar extends Component {
  constructor() {
    super();
    this.state = {
      algo: "",
      toggle: "",
      array: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  handleClick(algo) {
    this.setState({ algo: algo });
    this.props.setAlgo(algo);
  }

  selectColor(thisAlgo) {
    if (thisAlgo === this.state.algo) {
      return "active";
    }
    return "inactive";
  }

  handleSpeedChange = event => {
    this.props.setSpeed(event.target.value);
  };

  render() {
    return (
      <div>
        <ul id="toolbar" disabled={this.props.sorting}>
          <div id="fast">slow</div>
          <input
            id="changeSpeed"
            type="range"
            min="1"
            max="10"
            value="5.5"
            disabled={this.props.sorting}
            onChange={this.handleSpeedChange}
          />
          <div id="slow">fast</div>
          <li className="algo">
            <div
              className={this.selectColor("bubble")}
              onClick={() => this.handleClick("bubble")}
            >
              Bubble Sort
            </div>
          </li>
          <li className="algo">
            <div
              className={this.selectColor("quick")}
              onClick={() => this.handleClick("quick")}
            >
              Quick Sort
            </div>
          </li>
          <li className="algo">
            <div
              className={this.selectColor("merge")}
              onClick={() => this.handleClick("merge")}
            >
              Merge Sort
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Toolbar;
