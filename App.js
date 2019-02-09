import React, { Component } from 'react';
import AppNavigator from './routes/AppNavigator';

export default class App extends Component {
  render() {
    return (
      // Navigatorius savyje laiko jame aprasytus komponentus, arba kitus navigatorius ir jiem perduoda kelis propsus
      <AppNavigator />
    )
  }
}