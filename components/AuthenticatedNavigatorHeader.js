//Depricated

import React, { Component } from 'react'
import { Text, View, StyleSheet,  Platform } from 'react-native';

const AuthenticatedNavigatorHeader = ({ title, subtitle }) => {
    return (
        <View style={styles.headerContainer} onScroll={this.handleScroll}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 20,
        height: ( (Platform.OS === 'android') ? 86 : 70 ) + Expo.Constants.statusBarHeight,
        backgroundColor: '#056467',
        flexDirection: 'column',

    },
    headerTitle: {
        paddingTop: 30,
        paddingLeft: 20,
        fontSize: 24,
        fontWeight: '700',
        color: 'white'
    },
    headerSubtitle: {
        paddingLeft: 20,
        fontSize: 15,
        color: '#66e0ff'
    }
});

export default AuthenticatedNavigatorHeader;