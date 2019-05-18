import React, { Component } from 'react';
import { StyleSheet, View, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NewsHeaderToggles = ({onPress, value}) => {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => {value ? onPress() : undefined }} >
                <Icon style={styles.mrr} name="ios-calendar" size={35} color={value ? 'white' : '#ffc928'} />
            </TouchableOpacity>
            <Switch thumbColor='#ffc928' onValueChange={() => onPress()} value={value} />
            <TouchableOpacity onPress={() => {value ? undefined : onPress()}}>
                <Icon style={styles.mrl} name="ios-heart" size={35} color={value ? '#ffc928' : 'white'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mrl: {
        marginLeft: 10
    },
    mrr: {
        marginRight: 10
    }
});

export default NewsHeaderToggles;
