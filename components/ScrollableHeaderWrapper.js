import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const HEADER_MAX_HEIGHT = 120; //300
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 103;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollableHeaderWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
        };
    }

    render() {

    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
        this.state.scrollY,
        Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
      );

        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.7],
            extrapolate: 'clamp',
        });
        const titleTranslateY = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        const titleTranslateX = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -HEADER_SCROLL_DISTANCE / 2 ],
            extrapolate: 'clamp'
        });
    
    return (
        <View style={styles.fill}>
            <StatusBar translucent barStyle="light-content" backgroundColor="rgba(0, 0, 0, 0.251)" />
            <Animated.ScrollView
                style={styles.fill}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                    { useNativeDriver: true },
            )}
            >
            <View style={styles.scrollViewContent}>
                {this.props.children}
            </View>
        </Animated.ScrollView>
        <Animated.View
            style={[
                styles.header,
                { transform: [{ translateY: headerTranslate }] },
          ]}
        >
        <Animated.Image
            style={[
                styles.backgroundImage,
                {
                    opacity: imageOpacity,
                    transform: [{ translateY: imageTranslate }],
                },
            ]}
            source={require('../images/home-gradient.png')}
          />
        </Animated.View>
        <Animated.View
            style={[
                styles.bar,
                {
                transform: [
                    { scale: titleScale },
                    { translateY: titleTranslateY },
                    { translateX: titleTranslateX }
                ],
                },
          ]}
        >
            <Text style={styles.headerTitle}>{this.props.title}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        top: 0,
        left: 0,
        right: 0,
    },
    headerTitle: {
        fontSize: 33,
        fontWeight: '700',
        color: 'white'
    },
    headerSubtitle: {
        fontSize: 25,
        color: 'grey'
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
});