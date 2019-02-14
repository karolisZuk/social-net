import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import Firebase from '../Firebase';
import Input from '../components/Input';
import { ButtonPrimary, ButtonSecondary } from '../components/Buttons';

export default class Authenticate extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    }

    componentWillMount() {
        // tikrinam ar inicializavom firebase. jei ne - inicializuojam
        if (!Firebase.fb) {
            Firebase.init();
        }
    }

  onPressSignIn() {
    console.log(this.state);
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
                console.log(this.state.error);
            //TODO cia reiktu rodyti zinute su error message

            this.setState({isLoading: false});
        })
  }

    render() {
        return (
            <View style={styles.container}>
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
                    <ButtonPrimary onPress={() => this.onPressSignIn()}>Log in</ButtonPrimary>
                    <ButtonSecondary onPress={() => this.onPressRegister()}>Register</ButtonSecondary>
                </View>
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
