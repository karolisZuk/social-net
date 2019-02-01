import React from 'react';
import { StyleSheet, View } from 'react-native';
import RootNavigator from './Views/RootNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
