import React, { Component } from "react";
import "./App.css";
import "./components/Toolbar.css";
import Toolbar from "./components/Toolbar";
import Body from "./components/Body";

class App extends Component {
  constructor() {
    super();
    this.state = {
      algo: "",
      speed: 800,
      sorting: false
    };
    this.setAlgo = this.setAlgo.bind(this);
  }

  setAlgo(algo) {
    this.setState({ algo: algo });
  }

  appSorting = () => {
    this.setState({ sorting: true });
  };

  appNotSorting = () => {
    this.setState({ sorting: false });
  };

  setSpeed = value => {
    let speed = parseInt(1500 - 140 * value);
    this.setState({ speed: speed });
  };

  render() {
    return (
      <div className="App">
        <Toolbar
          setAlgo={this.setAlgo}
          sorting={this.state.sorting}
          setSpeed={this.setSpeed}
        />
        <Body
          algo={this.state.algo}
          appSorting={this.appSorting}
          appNotSorting={this.appNotSorting}
          speed={this.state.speed}
        />
      </div>
    );
  }
}

export default App;
