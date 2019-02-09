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
    isLoading: false
  }

  componentWillMount() {
    if (!Firebase.fb) {
        Firebase.init();
    }
    Firebase.auth.onAuthStateChanged((user) => {
        if (user) {
            this.props.navigation.navigate('Home');
        }
     });
  }

  onPressSignIn() {
    this.setState({isLoading: true, error: ''});
    const {email, password} = this.state;
    Firebase.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            Firebase.user = response;
            this.setState({isLoading: false});
            this.props.navigation.navigate('Home');
        }).catch(err => {
            this.setState({error: err+ ''});
            showMessage({
                message: this.state.error,
                type: "danger",
              });
        }).finally(()=>{
            this.setState({isLoading: false});
        });
  }

  onPressRegister() {
      //pradedame rodyti, kad puslapis kraunasi
    this.setState({isLoading: true});
    const {email, password} = this.state;
    Firebase.auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            // Isvalome klaidas ir nustojame rodyti puslapio krovimasi
            this.setState({error: '', isLoading: false});
            // Teisingai prisiregistravus response gauname user objekta
            Firebase.user = response;
            // Siuos props gauname is AppNavigator, kurio viduje yra sis komponentas
            this.props.navigation.navigate('Home');
        }).catch(err => {
            // err paverciame i stringa pridedami prie jo tuscia stringa.
            this.setState({error: err+ ''});
            showMessage({
                message: this.state.error,
                type: "danger",
              });
            this.setState({isLoading: false});
        })
  }

  renderCurrentState() {
    if(this.state.isLoading){
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
