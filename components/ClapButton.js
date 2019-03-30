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
                    <ClapBubble />
                </View>
            </View>
        )
    }
}

class ClapBubble extends Component {
    constructor(){
        super();
        this.state = {
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -100,
                duration: 500,
                easing: Easing.linear
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            })
        ]).start()
    }

    render () {
        let animationStyle = {
            transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity
        }
        return (
            <View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>1</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    clapBubble: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        position: 'absolute',
        backgroundColor: '#203c4a'
    },
    clapText: {
        color: '#ffc928',
        fontSize: 12
    },
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