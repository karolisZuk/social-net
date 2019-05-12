import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/*
    TODO add icon dropping from top.
*/

const HEADER_MAX_HEIGHT =  Platform.OS == 'android' ? 290 : 300
const HEADER_MIN_HEIGHT =  Platform.OS == 'android' ? 120 : 90
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
 

export default class ScrollableHeaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollY: new Animated.Value(0)};
    
    }

    render() {
        const headerTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const headerChildOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.3, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.7],
            extrapolate: 'clamp',
        });
        const headerChildScale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.75, 0.5],
            extrapolate: 'clamp',
        });
        const titleTranslateY = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        const titleTranslateX = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -180 ],
            extrapolate: 'clamp'
        });

    return (
        <View style={styles.fill}>
            <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.251)" />
            <Animated.ScrollView
                style={styles.fill}
                scrollEventThrottle={1}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true },)}
            >
            <View style={[styles.scrollViewContent]}>
                {this.props.children}
            </View>
        </Animated.ScrollView>
        <Animated.View style={[
            styles.header,{ transform: [{ translateY: headerTranslate }] },]} >
            <Animated.Image
                style={[styles.backgroundImage, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }]},]}
                source={require('../images/home-gradient.png')}
            />
        </Animated.View>
        <Animated.View style={[styles.bar,{ transform: [{ scale: titleScale }],},]}>
            <Animated.Text style={[styles.headerTitle, {transform: [{ translateY: titleTranslateY }, { translateX: titleTranslateX }]}]}>{this.props.title}</Animated.Text>
            <Animated.View style={[styles.headerChildWrapper, {opacity: headerChildOpacity}, {transform:[{scale: headerChildScale}]}]}>
                {this.props.headerChildComponent}
            </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerChildWrapper: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#203c4a',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 48 : 64,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        top: 0,
        left: 0,
        right: 0,
    },
    headerTitle: {
        fontSize: 37,
        fontWeight: '700',
        color: 'white'
    },
    headerSubtitle: {
        fontSize: 25,
        color: 'grey'
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    }
});