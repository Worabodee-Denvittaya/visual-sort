import React, { Component } from "react";
import ArrayInput from "./ArrayInput";
import SortButton from "./SortButton";
import Result from "./Result";

class Body extends Component {
  constructor() {
    super();
    this.state = {
      initialArray: [],
      bubbleArray: [],
      upper: [],
      lower: [],
      results: [],
      memo: [],
      pivot: 0,
      lowerPivot: 0,
      bubbling: 0,
      sorting: false,
      sorted: true
    };
  }

  setInitialArray = array => {
    this.setState({ initialArray: array });
  };

  setBubbleResult = (array, bubbling) => {
    this.setState({ bubbleArray: array });
    this.setState({ bubbling: bubbling });
  };

  setQuickSortResult = (upper, lower, pivot, lowerPivot) => {
    this.setState({ upper: upper });
    this.setState({ lower: lower });
    this.setState({ pivot: pivot });
    this.setState({ lowerPivot: lowerPivot });
  };

  setMergeResult = (upper, lower) => {
    this.setState({ upper: upper });
    this.setState({ lower: lower });
  };

  setResults = arrays => {
    const thisResults = this.state.results;
    thisResults.push(arrays.slice(0));
    this.setState({ results: thisResults });
  };

  isSorting = () => {
    this.setState({ sorting: true });
    this.props.appSorting();
  };

  isNotSorting = () => {
    this.setState({ sorting: false });
    this.props.appNotSorting();
  };

  isSorted = () => {
    this.setState({ sorted: true });
  };

  isNotSorted = () => {
    this.setState({ sorted: false });
  };

  render() {
    return (
      <div id="body">
        <ArrayInput
          setInitialArray={this.setInitialArray}
          isNotSorting={this.isNotSorting}
          isNotSorted={this.isNotSorted}
          sorted={this.state.sorted}
        />
        <Result
          initialArray={this.state.initialArray}
          pivot={this.state.pivot}
          lowerPivot={this.state.lowerPivot}
          iPosition={this.state.iPosition}
          jPosition={this.state.jPosition}
          bubbling={this.state.bubbling}
          bubbleArray={this.state.bubbleArray}
          upper={this.state.upper}
          lower={this.state.lower}
          sorting={this.state.sorting}
          sorted={this.state.sorted}
          algo={this.props.algo}
        />
        <SortButton
          algo={this.props.algo}
          setResults={this.setResults}
          isSorting={this.isSorting}
          isNotSorting={this.isNotSorting}
          isSorted={this.isSorted}
          isNotSorted={this.isNotSorted}
          setQuickSortResult={this.setQuickSortResult}
          setBubbleResult={this.setBubbleResult}
          setMergeResult={this.setMergeResult}
          initialArray={this.state.initialArray}
          showResults={this.showResults}
          sorting={this.state.sorting}
          speed={this.props.speed}
        />
      </div>
    );
  }
}

export default Body;
