import React from 'react'; //imr
import { View, StyleSheet } from 'react-native'; //imrn

//enf
const Card = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
});

export default Card;