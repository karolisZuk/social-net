import React from 'react'; //imr
import { View, StyleSheet, Text } from 'react-native'; //imrn

//enf
const ClapCounter = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text style={styles.text}>{props.count}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 65,
        bottom: 15,
    },
    text: {
        color: 'grey',
        fontSize: 18,

    },
    bubble: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#ecf0f1',
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ClapCounter;