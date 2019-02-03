import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';

export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Messages goes here</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})