import React from 'react';
import { StyleSheet, View } from 'react-native';
import Firebase from './Firebase';
import Input from './components/Input';
import Button from './components/Button';

export default class App extends React.Component {

  onTextChange(text) {
    console.log(`text changed ${text}`);
  }

  onPressSignIn() {
    console.log('User is trying to sign in!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Input 
          placeholder='Enter your email'
          label='Email'
          onChangeText={email => this.onTextChange(email)}
        />
        <Input 
        placeholder='Enter your password'
        label='Password'
        secureTextEntry
        onChangeText={password => this.onTextChange(password)}
        />
        <Button onPress={() => this.onPressSignIn()}>Log in</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
