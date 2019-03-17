import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonPrimary = ({onPress, children}) => {
    return (
        <TouchableOpacity style={styles.btnPrimary} onPress={onPress}>
            <Text style={styles.btnPrimaryText}>{children}</Text>
        </TouchableOpacity>
    )
}

const ButtonSecondary = ({onPress, children}) => {
    return (
        <TouchableOpacity style={styles.btnSecondary} onPress={onPress}>
            <Text style={styles.btnSecondaryText}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnPrimary: {
        marginTop: 1,
        padding: 20,
        width: '100%',
        backgroundColor: '#203c4a',
        borderRadius: 4,
        alignItems: 'center'
    },
    btnPrimaryText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    btnSecondary: {
        marginTop: 1,
        padding: 20,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#203c4a',
        borderRadius: 4,
        borderWidth: 3,
        alignItems: 'center'
    },
    btnSecondaryText:{
        color: '#203c4a',
        fontWeight: '700',
        fontSize: 18,
    }
})

export { ButtonPrimary, ButtonSecondary } ;