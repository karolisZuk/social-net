import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Audio } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ClapButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            claps: []
        }
    }

    async clap() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../assets/sounds/blop.mp3'));
            await soundObject.playAsync();
            // Your sound is playing!
          } catch (error) {
            // An error occurred!
        }
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
        this.props.updatePostClaps(this.props.post.id, this.state.count); //TODO id, clap count
    }

    keepClapping() {
        this.clapTimer = setInterval(()=>this.clap(), 150);
    }

    stopClapping() {
        if (this.clapTimer) {
            clearInterval(this.clapTimer);
        }
    }

    renderClaps() {
        return this.state.claps.map(totalCount => <ClapBubble key={totalCount} count={totalCount} animationComplete={()=> this.animationComplete(totalCount)} />)
    }

    animationComplete(countNum) {
        claps = this.state.claps;
        claps.splice(claps.indexOf(countNum), 1);
        this.setState({claps});
    }

    render(){
        let clapIcon = this.state.count ? 'ios-heart' : 'ios-heart-empty'
        return (
            <View  style={styles.container}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.clap()}
                        onPressIn={() => this.keepClapping()}
                        onPressOut={() => this.stopClapping()}
                        activeOpacity={0.7}
                        style={styles.clapBtn}>
                        <Icon name={clapIcon} color={'#203c4a'} size={25} />
                    </TouchableOpacity>
                </View>
                {this.renderClaps()}
            </View>
        )
    }
}

class ClapBubble extends Component {

    componentDidMount() {
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
        ]).start(() => {
            setTimeout(()=> {
                this.props.animationComplete(this.props.count);
            }, 300);
        });
    }

    constructor(){
        super()
        this.state = {
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    render(){
        let animationStyle = {
            transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity
        }
        return(
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+ {this.props.count}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    clapText: {
        color: '#ffc928',
        fontSize: 12
    },
    clapBubble: {
        position: 'absolute',
        height: 45,
        width: 45,
        borderRadius: 23,
        backgroundColor: '#203c4a',
        justifyContent: 'center',
        alignItems: 'center',
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

// create and style heart button
// add it to HOME VIEW. Style the button to appropriate location
// create and style floating numbers
// Animate floating numbers
// add heart toggle
// add hold functionality