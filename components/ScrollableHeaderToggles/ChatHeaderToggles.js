import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTextField from '../Inputs/HeaderTextField';
import { ButtonHeader } from '../Buttons';

const NewsHeaderToggles = ({onPress, recipient, message, onChangeText}) => {
    return (
        <View style={styles.wrapper}>
            <HeaderTextField
                value={recipient}
                placeholder="John"
                onChangeText={recipient => onChangeText({recipient: recipient})}
                label="To: "/>
            <HeaderTextField
                value={message}
                placeholder="Hi, John"
                onChangeText={message => onChangeText({message: message})}
                label="Message: "/>
            <View style={{justifyContent: 'center', alignSelf: 'center' }}>
                <ButtonHeader onPress={()=> onPress()}>Send</ButtonHeader>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
    },
    text: {
        color: 'white'
    }
});

export default NewsHeaderToggles;
