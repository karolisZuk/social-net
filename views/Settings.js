import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import Firebase from '../Firebase';
import { Button } from '../components/Button';

export default class Settings extends Component {
    state = {
        user: {}
    }

    componentWillMount(){
            Firebase.auth.onAuthStateChanged((user) => {
                if (user) {
                let newObj = JSON.parse(JSON.stringify(user));
                this.setState({user: newObj});
                }
            });
    }

    logout(){
        Firebase.auth.signOut().then(() => {
            this.props.navigation.navigate('Authenticate');
            },(error) => {
                console.log(error);
            });
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.key}>Email:</Text>
                <Text style={styles.value}>{this.state.user.email}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.key}>API key:</Text>
                <Text style={styles.value}>{this.state.user.apiKey}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.key}>Last login:</Text>
                <Text style={styles.value}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(this.state.user.lastLoginAt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.key}>Account created at:</Text>
                <Text style={styles.value}>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(this.state.user.createdAt)}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => this.logout()}>Logout</Button>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 40,
        position: 'absolute',
        bottom: 0,
        left: '50%'
    },
    value: {
        color: '#00aeef',
        fontSize: 14,
        paddingLeft: 2
    },
    key: {
        textTransform: 'uppercase',
        fontWeight: '700',
        color: 'grey',
        fontSize: 14
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})