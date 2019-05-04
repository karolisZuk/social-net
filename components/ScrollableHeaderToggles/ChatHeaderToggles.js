import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonHeader } from '../Buttons';
import HeaderTextField from '../Inputs/HeaderTextField';

const ChatHeaderToggles = ({recipient, message, onChangeText, onPress}) => {
    return (
        <View style={styles.wrapper}>
            <HeaderTextField
                label="To: "
                value={recipient}
                placeholder="John"
                onChangeText={recipient => onChangeText({recipient})}
                />
            <HeaderTextField
                label="Message: "
                value={message}
                placeholder="Hi, John!"
                onChangeText={message => onChangeText({message})}
                />
            <ButtonHeader onPress={() => onPress()}>Send</ButtonHeader>
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

export default ChatHeaderToggles;
