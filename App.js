import React from 'react';
import { StyleSheet, View } from 'react-native';
import Firebase from './Firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';

export default class App extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    Firebase.init();
  }

  render() {
    return (
      <View style={styles.container}>
        <Input 
          placeholder='Enter your email'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value = {this.state.email}
        />
        <Input 
        placeholder='Enter your password'
        label='Password'
        secureTextEntry
        onChangeText={password => this.setState({ password })}
        value = {this.state.password}
        />
        <Button onPress={() => console.log(this.state)}>Log in</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  }
});
