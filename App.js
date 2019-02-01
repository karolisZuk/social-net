import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Firebase from './Firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
    authenticating: false
  }

  componentWillMount() {
    Firebase.init();
  }

  onPressSignIn() {
    console.log(this.state);
    this.setState({authenticating: true})
  }

  onPressRegister() {

  }

  renderCurrentState() {
    if(this.state.authenticating){
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      return (
        <View style={styles.form}>
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
          <Button onPress={() => this.onPressSignIn()}>Log in</Button>
          <Button onPress={() => this.onPressRegister()}>Register</Button>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});
