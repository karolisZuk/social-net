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

const ButtonHeader = ({onPress, children}) => {
    return (
        <TouchableOpacity style={styles.btnHeader} onPress={onPress}>
            <Text style={styles.btnHeaderText}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnHeader: {
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        backgroundColor: '#203c4a',
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 15,
        borderWidth: 3
    },
    btnHeaderText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    btnPrimary: {
        margin: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 35,
        paddingRight: 35,
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
        margin: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 35,
        paddingRight: 35,
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

export { ButtonPrimary, ButtonSecondary, ButtonHeader } ;