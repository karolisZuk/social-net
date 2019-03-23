import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ClapButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            claps: []
        }
    }

    clap() {
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
        this.props.updatePostClaps(this.props.post.data, 'test'); //TODO id, clap count
    }

    render(){
        let clapIcon = this.state.count ? 'ios-heart' : 'ios-heart-empty'
        return (
            <View  style={styles.container}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.clap()}
                        activeOpacity={0.7}
                        style={styles.clapBtn}>
                        <Icon name={clapIcon} color={'#203c4a'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    clapBtn: {
        height: 45,
        width: 45,
        borderRadius: 23,
        backgroundColor: '#ecf0f1',
        elevation: 3,
        paddingTop: 7,
        justifyContent: 'center',
        alignItems: 'center',
    }
});