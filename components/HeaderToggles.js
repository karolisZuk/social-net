import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderToggles = ({onPress, value}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon style={{marginRight: 10}} name="ios-calendar" size={35} color={value ? 'white' : '#ffc928'} />
            <Switch thumbColor='#ffc928' onValueChange={() => onPress()} value={value} />
            <Icon style={{marginLeft: 10}} name="ios-heart" size={35} color={value ? '#ffc928' : 'white'} />
        </View>
    )
}



const styles = StyleSheet.create({
    toggleText: {
        color: 'white',
    }
});

export default HeaderToggles;
