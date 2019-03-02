import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Firebase from '../Firebase';
import Input from '../components/Input';
import { ButtonPrimary, ButtonSecondary } from '../components/Buttons';
import FlashMessage, { showMessage } from 'react-native-flash-message';

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
        Firebase.auth.onAuthStateChanged((user) => {
            if (user){
                Firebase.user = user;
                this.props.navigation.navigate('Home');
            }
        })
    }

  onPressSignIn() {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    Firebase.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({error: '', isLoading: false});
            Firebase.user = response;
            this.props.navigation.navigate('Home');
            }
        ).catch(err => {
            this.setState({error: err + ''});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
            this.setState({isLoading: false});
            }
        )
  }

  onPressRegister() {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    Firebase.auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({error: '', isLoading: false});
            Firebase.user = response;
            this.props.navigation.navigate('Home');
        }).catch(err => {
            this.setState({error: err + ''});
            showMessage({
                message: this.state.error,
                type: 'danger'
            });
            this.setState({isLoading: false});
        })
  }

    renderCurrentState() {
        if (this.state.isLoading){
            return (
                <View style={styles.form}>
                    <ActivityIndicator size='large' />
                </View>
            );
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
                    <ButtonPrimary onPress={() => this.onPressSignIn()}>Log in</ButtonPrimary>
                    <ButtonSecondary onPress={() => this.onPressRegister()}>Register</ButtonSecondary>
                </View>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
                <FlashMessage position='top'/>
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
