import React, { Component } from "react";
import "./SortButton.css";

class SortButton extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      memo: [],
      result: [],
      mergeMemo: [],
      pivot: 0
    };
  }

  getMinIndex = array => {
    let min = array[0][0];
    for (let i = 1; i < array.length; i++) {
      if (array[i][0] < min) min = array[i][0];
    }
    return min;
  };

  order = mergeMemo => {
    const newMemo = [];
    let newMerging = [];

    for (let i = 0; i < mergeMemo.length; i++) {
      let merging = mergeMemo[i];
      let min = this.getMinIndex(merging);
      newMerging = [];

      for (let j = 0; j < merging.length; j++) {
        newMerging.push([min, merging[j][1]]);
        min++;
      }
      newMemo.push(newMerging);
    }
    return newMemo;
  };

  toString = array => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].length === 2) array[i] = array[i].join(",");
    }
    array = array.join(";");
    return array;
  };

  isSubSet = (master, sub) => {
    let masterString = master.map(x => String(x));
    let subString = sub.map(x => String(x));

    const b = subString.every(val => masterString.indexOf(val) >= 0);
    return b;
  };

  orderIndex = array => {
    let min = this.getMinIndex(array);
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
      newArray.push([min, array[i][1]]);
      min++;
    }
    return newArray;
  };

  reOrder = mergeMemo => {
    let array = [],
      sub = [],
      reOrdered = [];

    let visited = new Set();
    visited.clear();

    for (let i = 0; i < mergeMemo.length; i++) {
      array = [...mergeMemo[i]];

      for (let j = 0; j <= i; j++) {
        if (i !== j) {
          sub = [...mergeMemo[j]];
          let stringSub = this.toString([...sub]);

          if (
            this.isSubSet([...array], [...sub]) &&
            (visited.has(stringSub) === false || visited.size === 0)
          ) {
            let ordered = this.orderIndex(sub);
            for (let k = 0; k < array.length; k++) {
              for (let l = 0; l < sub.length; l++) {
                if (array[k] === sub[l]) array[k] = ordered[l];
              }
            }

            visited.add(stringSub);
          }
        }
      }
      reOrdered.push(array);
    }

    return reOrdered;
  };

  showMergeResult = (mergeMemo, sortedArr) => {
    const reOrdered = this.reOrder(mergeMemo);
    mergeMemo = this.order(mergeMemo);

    let previous = [];
    let upperBefore = [];
    let upperAfter = [];
    let lower = [];
    let upperBeforeMemo = [];
    let upperAfterMemo = [];
    let lowerMemo = [];

    //for each entry in the memo
    for (let i = 0; i < mergeMemo.length; i++) {
      const merging = mergeMemo[i];
      lower = sortedArr.map(x => "");

      if (i === 0) upperBefore = [...this.props.initialArray];
      else upperBefore = [...previous];
      for (let j = 0; j < merging.length; j++) {
        upperBefore[merging[j][0]] = "";
        lower[merging[j][0]] = merging[j][1];
      }

      lowerMemo.push(lower);
      upperBeforeMemo.push(upperBefore);

      upperAfter = [];
      for (let j = 0; j < sortedArr.length; j++) {
        if (upperBefore[j] === "") {
          upperAfter.push(lower[j]);
        } else {
          upperAfter.push(upperBefore[j]);
        }
      }

      previous = [...upperAfter];
      upperAfterMemo.push(upperAfter);
    }

    const upperResults = [];
    let before = [],
      after = [],
      merge = [],
      space = [];

    for (let i = 0; i < upperBeforeMemo.length; i++) {
      if (i === 0) {
        before = [...upperBeforeMemo[i]];
        after = [...this.props.initialArray];
        merge = [...reOrdered[i]];
        space = [];
      } else {
        before = [...upperBeforeMemo[i]];
        after = [...upperAfterMemo[i - 1]];
        merge = [...reOrdered[i]];
        space = [];
      }
      //find out which index is spaced out
      for (let j = 0; j < before.length; j++) {
        if (before[j] === "") space.push(j);
      }

      for (let j = 0; j < merge.length; j++) {
        let upper = [...after];
        for (let k = 0; k <= j; k++) {
          upper.splice(merge[k][0], 1, "");
        }
        upperResults.push(upper);
      }
      upperResults.push(upperAfterMemo[i]);
    }
    const lowerResults = [];
    let empty = [];

    for (let i = 0; i < lowerMemo.length; i++) {
      empty = [];
      const row = [...lowerMemo[i]];
      const values = [],
        indeces = [];
      let lower = [];

      for (let j = 0; j < row.length; j++) {
        empty.push("");
      }

      for (let j = 0; j < row.length; j++) {
        if (Number.isInteger(row[j])) {
          values.push(row[j]);
          indeces.push(j);
        }
      }

      for (let j = 0; j < values.length; j++) {
        lower = [...empty];
        for (let k = 0; k <= j; k++) {
          lower.splice(indeces[k], 1, values[k]);
        }
        lowerResults.push(lower);
      }
      lowerResults.push(empty);
    }

    this.props.setMergeResult(this.props.initialArray, empty);

    let count = 0;
    let timerID = setInterval(() => {
      if (count < upperResults.length) {
        this.props.setMergeResult(upperResults[count], lowerResults[count]);
        count++;
      } else {
        this.props.isSorted();
        clearInterval(timerID);
      }
    }, this.props.speed);
  };

  merge = (leftArr, rightArr) => {
    let thisMergeMemo = this.state.mergeMemo;
    let sortedArr = [];

    while (leftArr.length && rightArr.length) {
      if (leftArr[0][1] <= rightArr[0][1]) {
        sortedArr.push(leftArr[0]);
        leftArr = leftArr.slice(1);
      } else {
        sortedArr.push(rightArr[0]);
        rightArr = rightArr.slice(1);
      }
    }

    while (leftArr.length) {
      sortedArr.push(leftArr.shift());
    }

    while (rightArr.length) {
      sortedArr.push(rightArr.shift());
    }

    thisMergeMemo.push(sortedArr.slice(0));
    this.setState({ mergeMemo: thisMergeMemo });
    return sortedArr;
  };

  mergesort = arr => {
    if (arr.length < 2) {
      return arr;
    } else {
      var midpoint = Math.round(arr.length / 2);

      var leftArr = arr.slice(0, midpoint);
      var rightArr = arr.slice(midpoint, arr.length);

      return this.merge(this.mergesort(leftArr), this.mergesort(rightArr));
    }
  };

  partition = (arr, low, high) => {
    const newMemo = this.state.memo;

    let i, j, temp, pivot;
    pivot = arr[high];
    i = low - 1; // index of smaller element
    for (j = low; j < high; j++) {
      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++;
        newMemo.push([i, j].concat(arr.slice(0), high));
        // swap arr[i] and arr[j]
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        this.setState({ memo: newMemo });
      }
    }

    // swap arr[i+1] and arr[high] (or pivot)
    newMemo.push([i + 1, j].concat(arr.slice(0), high));
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
  };

  /* The main function that implements QuickSort() 
      arr[] --> Array to be sorted, 
      low  --> Starting index, 
      high  --> Ending index */
  quickSort = (arr, low, high) => {
    let pi;
    const newMemo = this.state.memo;

    if (low < high) {
      /* pi is partitioning index, arr[pi] is  
              now at right place */
      pi = this.partition(arr, low, high);

      this.setState({ memo: newMemo });

      // Recursively sort elements before partition and after partition
      this.quickSort(arr, low, pi - 1);
      this.quickSort(arr, pi + 1, high);
    }
  };

  bubbleSort = () => {
    const thisArray = this.props.initialArray;
    const length = thisArray.length;
    let i, j, temp;
    let first = true;

    const newMemo = this.state.memo;

    for (i = 0; i < length - 1; i++) {
      for (j = 0; j < length - i - 1; j++) {
        if (thisArray[j] > thisArray[j + 1]) {
          if (first === true) {
            newMemo.push([j].concat(thisArray.slice(0)));
            this.setState({ memo: newMemo });

            temp = thisArray[j];
            thisArray[j] = thisArray[j + 1];
            thisArray[j + 1] = temp;

            newMemo.push([j + 1].concat(thisArray.slice(0)));
            this.setState({ memo: newMemo });

            first = false;
          } else {
            temp = thisArray[j];
            thisArray[j] = thisArray[j + 1];
            thisArray[j + 1] = temp;
            newMemo.push([j + 1].concat(thisArray.slice(0)));
            this.setState({ memo: newMemo });
          }
        } else first = true;
      }
    }
    if (this.state.memo.length === 0) {
      this.props.isSorted();
      this.props.setBubbleResult(thisArray, 0);
    } else {
      this.showResults(this.state.memo);
    }
  };

  showResults = memo => {
    let array = memo[0];
    let bubbling = array[0];
    array = array.slice(1);
    this.props.setBubbleResult(array, bubbling);

    let i = 1;
    let timerID = setInterval(() => {
      if (i < memo.length) {
        array = memo[i];
        bubbling = array[0];
        array = array.slice(1);
        this.props.setBubbleResult(array, bubbling);
        i++;
      } else {
        this.props.isSorted();
        clearInterval(timerID);
      }
    }, this.props.speed);
    this.setState({ memo: [] });
  };

  showQuickSortResult = memo => {
    let upperMemo = [],
      lowerMemo = [];

    for (let i = 0; i < memo.length; i++) {
      let array = memo[i];
      let iPosition = array[0];
      let jPosition = array[1];
      let lower = [],
        empty = [];
      array = array.slice(2);

      if (jPosition === array[array.length - 1]) lower.push(jPosition);
      else lower.push("");

      for (let j = 0; j < array.length - 1; j++) {
        lower.push("");
        empty.push("");
      }

      lowerMemo.push([...lower]);

      lower.splice(jPosition + 1, 1, array[jPosition]);
      lower.splice(iPosition + 1, 1, array[iPosition]);
      lowerMemo.push([...lower]);

      lower.splice(iPosition + 1, 1, array[jPosition]);
      lower.splice(jPosition + 1, 1, array[iPosition]);
      if (Number.isInteger(lower[0])) lower.splice(0, 1, iPosition);
      lowerMemo.push([...lower]);

      upperMemo.push([...array]);
      array.splice(iPosition, 1, "");
      array.splice(jPosition, 1, "");
      upperMemo.push([...array]);
      upperMemo.push([...array]);

      if (Number.isInteger(lower[0])) {
        lowerMemo.push([""].concat(empty));
        array = [...memo[i]].slice(2);
        let iPos = array[iPosition];
        let jPos = array[jPosition];
        array.splice(jPosition, 1, iPos);
        array.splice(iPosition, 1, jPos);
        array.splice(array.length - 1, 1, iPosition);
        upperMemo.push([...array]);
      }
    }

    let upper = [...upperMemo[0]];
    let lower = [...lowerMemo[0]];
    let pivot = upper[upper.length - 1];
    let lowerPivot = lower[0];
    upper.splice(upper.length - 1, 1);
    this.props.setQuickSortResult(upper, lower.slice(1), pivot, lowerPivot);

    let i = 1;
    let timerID = setInterval(() => {
      if (i < upperMemo.length) {
        let upper = [...upperMemo[i]];
        let lower = [...lowerMemo[i]];
        let lowerPivot = lower[0];
        lower.splice(0, 1);
        let pivot = upper[upper.length - 1];

        upper.splice(upper.length - 1, 1);

        this.props.setQuickSortResult(upper, lower, pivot, lowerPivot);
        i++;
      } else {
        this.props.isSorted();
        clearInterval(timerID);
      }
    }, this.props.speed);
    this.setState({ memo: [] });
  };

  render() {
    return (
      <div
        id="sort-button"
        disabled={this.props.sorting}
        onClick={() => {
          switch (this.props.algo) {
            case "bubble":
              this.props.isSorting();
              this.props.isNotSorted();
              this.bubbleSort();
              break;
            case "merge":
              this.setState({ mergeMemo: [] }, () => {
                this.props.isNotSorted();
                this.props.isSorting();
                let array = [];
                for (let i = 0; i < this.props.initialArray.length; i++) {
                  array[i] = [i, this.props.initialArray[i]];
                }
                this.showMergeResult(
                  this.state.mergeMemo,
                  this.mergesort(array, 0, 0)
                );
              });
              break;
            case "quick":
              this.setState({ memo: [] });
              this.props.isSorting();
              this.props.isNotSorted();
              this.quickSort(
                this.props.initialArray,
                0,
                this.props.initialArray.length - 1
              );
              this.showQuickSortResult(this.state.memo);
              break;
            default:
              this.bubbleSort();
              break;
          }
        }}
      >
        Sort
      </div>
    );
  }
}

export default SortButton;
