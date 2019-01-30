import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
  card: {
    // width: '100%',
    // height: 425,
    backgroundColor: '#fff',
    borderRadius: 8,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 30,
    padding: 10,
    margin: 30,
    zIndex: 1,
    position: 'relative',
  },
  open: {
    position: 'absolute',
    zIndex: 500,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});

const DEVICE_HEIGHT = Dimensions.get('window').height;
const INITIAL_HEIGHT = 425;

class Card extends Component {
  state = {
    scale: new Animated.Value(1),
    height: new Animated.Value(INITIAL_HEIGHT),
    margin: new Animated.Value(1),
    distanceFromTop: null,
    isOpen: false,
  }

  pressIn = () => {
    const { scale } = this.state;
    Animated.spring(scale, {
      toValue: 0.95,
    }).start();
  }

  pressOut = () => {
    const { scale, height, margin, distanceFromTop, isOpen } = this.state;

    if (!isOpen) {
      this.setState({ isOpen: true });
      Animated.parallel([
        Animated.spring(height, {
          toValue: DEVICE_HEIGHT,
          friction: 20
        }),
        Animated.spring(scale, {
          toValue: 1,
        }),
        Animated.spring(margin, {
          toValue: 0,
          friction: 20
        }),
        Animated.spring(distanceFromTop, {
          toValue: 0
        })
      ]).start((res) => {
        // this.setState({ isOpen: true });
      });
    } else {
      this.setState({ isOpen: false });
      Animated.parallel([
        Animated.spring(height, {
          toValue: INITIAL_HEIGHT,
          friction: 20
        }),
        Animated.spring(scale, {
          toValue: 1,
        }),
        Animated.spring(margin, {
          toValue: 1,
          friction: 20
        })
      ]).start()
    }
  }

  handleLayout = ({ nativeEvent }) => {
    const { distanceFromTop, isOpen } = this.state;
    const newDistanceFromTop = nativeEvent.layout.y;
    if (distanceFromTop !== newDistanceFromTop && !isOpen) {
      this.setState({ distanceFromTop: new Animated.Value(newDistanceFromTop) });
    }
  }

  render() {
    const { scale, height, isOpen, margin, distanceFromTop } = this.state;

    return (
      <>
      <TouchableWithoutFeedback
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        onLayout={this.handleLayout}
      >
        <Animated.View
          style={{
          ...styles.card,
          transform: [{
            scale,
          }],
          height,
          margin: margin.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 30],
          }),
            ...isOpen ? styles.open : {},
          // top: isOpen ? distanceFromTop : 0
          }}
          >
            <SafeAreaView>
              <Text>Card</Text>
              <Text>At the end of the day win-win. Pushback. Marketing computer development html roi feedback team website. </Text>
            </SafeAreaView>
        </Animated.View>
        {/* add placeholder to stop background cards from jumping */}
      </TouchableWithoutFeedback>
      {isOpen && (
        <View style={{ height: 425 }} />
      )}
      </>
    );
  }
}

export default Card;