/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calcultionText: '',
    };
    this.operations = ['DEL', '+', '-', '*', '/'];
  }

  calculateResult() {
    const text = this.state.resultText;
    this.setState({calcultionText: eval(text)});
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    if (text == '=') {
      return this.validate() && this.calculateResult();
    }

    this.setState({resultText: this.state.resultText + text});
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        const text = this.state.resultText.split('');
        text.pop();
        this.setState({
          resultText: text.join(''),
        });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop();
        if (this.operations.indexOf(lastChar) > 0) return;
        if (this.state.text == '') return;
        this.setState({resultText: this.state.resultText + operation});
    }
  }

  render() {
    let rows = [];
    let nums = [
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
      ['.', 0, '='],
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.btntext}>{nums[i][j]}</Text>
          </TouchableOpacity>,
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={styles.white}>{this.operations[i]}</Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calcultion}>
          <Text style={styles.calcultionText}>{this.state.calcultionText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calcultionText: {
    fontSize: 24,
    color: 'black',
  },
  resultText: {
    fontSize: 30,
    color: 'black',
  },
  btntext: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  white: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  btn: {
    flex: 1,
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calcultion: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'stretch',
    backgroundColor: '#636363',
  },
});
