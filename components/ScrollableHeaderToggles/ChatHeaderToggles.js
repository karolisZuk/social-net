import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NewsHeaderToggles = () => {
    return (
        <View style={styles.wrapper}>
            <Text>Message</Text>
            <Text>Message</Text>
            <Text>Message</Text>
            <Text>Message</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default NewsHeaderToggles;
