import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';

export default class Post extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Post stuff from here</Text>
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