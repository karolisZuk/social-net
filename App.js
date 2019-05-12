import React, { Component } from 'react';
import AppNavigator from './routes/AppNavigator';
import { YellowBox } from 'react-native';

export default class App extends Component {
  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);

    return (
      <AppNavigator />
    )
  }
}