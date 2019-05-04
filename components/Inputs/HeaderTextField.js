import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { Platform } from 'expo-core';

const HeaderTextField = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                autoCorrect={false}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[
                    styles.input, 
                    {height: Platform.OS == 'android' ? 50 : 30}
                    ]}
                secureTextEntry={secureTextEntry}
                value={value}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
    },
    label: {
        marginTop: 10,
        padding: 5,
        paddingBottom: 0,
        color: 'white',
        fontSize: 17,
        fontWeight: '700',
    },
    input: {
        paddingVertical: 0,
        marginTop: 10,
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 0,
        color: 'black',
        fontSize: 18,
        borderColor: '#eee',
        borderWidth: 2,
        borderRadius: 15,
        flexGrow:2,
        backgroundColor: 'white'
    }
});

export default HeaderTextField;
