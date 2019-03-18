import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Firebase from '../Firebase';
import Input from '../components/Input';
import { ButtonPrimary, ButtonSecondary } from '../components/Buttons';
import FlashMessage, { showMessage } from 'react-native-flash-message';

export default class Authenticate extends React.Component {
    constructor(props) {
        super(props);
    
        this._isMounted = false;
        state = {
            email: '',
            password: '',
            error: '',
            isLoading: false
        }
    }

    componentDidMount(){
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentWillMount() {
        this.setState({isLoading: true});
        if (!Firebase.fb) {
            Firebase.init();
        }
        Firebase.auth.onAuthStateChanged(user => {
            if (user) {
                Firebase.user = user;
                this._isMounted && this.setState({isLoading: false});
                this.props.navigation.navigate('Home');
            } else {
                this._isMounted && this.setState({isLoading: false});
            }
        })
    }

    onPressSignIn() {
        if (this._isMounted) {
            this.setState({isLoading: true});
            const {email, password} = this.state;
            Firebase.auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    Firebase.user = response;
                    this.setState({error: '', isLoading: false});
                    this.props.navigation.navigate('Home');
                    }
                ).catch(err => {
                    this.setState({error: err + '', isLoading: false});
                    showMessage({
                        message: this.state.error,
                        type: 'danger'
                    });
                    }
                )
            }
    }

    onPressRegister() {
        if (this._isMounted) {
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
                })
        }
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
                    <Text style={styles.explanatoryText}>Do not reuse your bank password, we are bad at security.</Text>
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
    explanatoryText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center'
    },
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
