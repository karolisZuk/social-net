import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import Firebase from '../Firebase';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class Authenticate extends React.Component {
    _isMounted;
    state = {
        email: '',
        password: '',
        error: '',
        authenticating: true
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    componentWillMount() {
        if (!Firebase.fb) {
            Firebase.init();
        }
        Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.user = user;
                this.props.navigation.replace('Home');
            } if (this._isMounted){
                this.setState({authenticating: false});
            }
        });
    }

    onPressSignIn() {
        if (this._isMounted){
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
                this.setState({authenticating: false});
            })
        }
    }

    onPressRegister() {
        if(this._isMounted){
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
                this.setState({authenticating: false});
            })
        }
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
            <PrimaryButton onPress={() => this.onPressSignIn()}>Log in</PrimaryButton>
            <PrimaryButton onPress={() => this.onPressRegister()}>Register</PrimaryButton>
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
