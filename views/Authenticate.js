import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import Firebase from '../Firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class Authenticate extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    authenticating: false
  }

  componentWillMount() {
    if (!Firebase.fb) {
        Firebase.init();
    }
    Firebase.auth.onAuthStateChanged((user) => {
        if (user) {
            this.props.navigation.replace('Home');
        }
     });
  }

  onPressSignIn() {
    this.setState({authenticating: true});
    const {email, password} = this.state;
    Firebase.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({error: '', loading: false});
            Firebase.user = response;
            this.setState({authenticating: false});
            this.props.navigation.replace('Home');
        }).catch(err => {
            this.setState({error: err+ ''});
            showMessage({
                message: this.state.error,
                type: "danger",
              });
        })
  }

  onPressRegister() {
    this.setState({authenticating: true});
    const {email, password} = this.state;
    Firebase.auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({error: '', loading: false});
            Firebase.user = response;
            this.setState({authenticating: false});
            this.props.navigation.replace('Home');
        }).catch(err => {
            this.setState({error: err+ ''});
            showMessage({
                message: this.state.error,
                type: "danger",
              });
        })
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
        <Text>Welcome</Text>
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
        <FlashMessage position="top" />
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
