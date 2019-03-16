import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScrollableHeaderWrapper from '../components/ScrollableHeaderWrapper';
import Firebase from '../Firebase';
import { ButtonSecondary } from '../components/Buttons';

export default class Settings extends Component {

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
    btnWrapper: {
        padding: 40,
        position: 'absolute',
        bottom: 0,
        left: '50%'
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
