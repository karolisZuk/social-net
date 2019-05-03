import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NewsHeaderToggles = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>Message</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
});

export default NewsHeaderToggles;
