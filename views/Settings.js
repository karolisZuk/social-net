import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import Firebase from '../Firebase';
import { ButtonSecondary } from '../components/Buttons';

export default class Settings extends Component {

    logout(){
        Firebase.auth.signOut().then(() => {
                this.props.navigation.navigate('Authenticate');
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <ScrollableHeaderWrapper title='Settings'>
            <View style={styles.container}>
                <ButtonSecondary onPress={()=>this.logout()}>Logout</ButtonSecondary>
            </View>
            </ScrollableHeaderWrapper>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '50%'
    }
});
