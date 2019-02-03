import React, { Component } from 'react'
import { Text, View, StyleSheet,  Platform } from 'react-native';

const RootNavigationHeader = ({ title, subtitle }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: (Platform.OS === 'android') ? Expo.Constants.statusBarHeight : 20,
        height: ( (Platform.OS === 'android') ? 86 : 70 ) + Expo.Constants.statusBarHeight,
        backgroundColor: '#00aeef',
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

export default RootNavigationHeader;