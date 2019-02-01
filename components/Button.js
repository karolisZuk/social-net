import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Button = ({onPress, children}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 1,
        padding: 20,
        width: '100%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center'
    },
    text:{
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    }
})

export { Button} ;
