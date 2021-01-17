import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  add,
  diffClamp,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';
import {Card, cards, CARD_HEIGHT as DEFAULT_CARD_HEIGHT} from './components';
import {
  withDecay,
  usePanGestureHandler,
} from 'react-native-redash/lib/module/v1';
import {PanGestureHandler} from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');
const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT + MARGIN * 2;
const App = () => {
  const [containerHeight, setContainerHeight] = useState(height);
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const visibleCards = Math.floor(containerHeight / CARD_HEIGHT);
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -cards.length * CARD_HEIGHT + visibleCards * CARD_HEIGHT,
    0,
  );
  return (
    <View
      style={styles.container}
      onLayout={({
        nativeEvent: {
          layout: {height: h},
        },
      }) => setContainerHeight(h)}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View>
          {cards.map((card, index) => {
            const positionY = add(y, index * CARD_HEIGHT);
            const isDisappering = -CARD_HEIGHT;
            const isOnTop = 0;
            const isOnBottom = (visibleCards - 1) * CARD_HEIGHT;
            const isAppering = visibleCards * CARD_HEIGHT;
            const extraTranslationY = interpolate(positionY, {
              inputRange: [isOnBottom, isAppering],
              outputRange: [0, -CARD_HEIGHT / 4],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = add(
              interpolate(y, {
                inputRange: [-CARD_HEIGHT * index, 0],
                outputRange: [-CARD_HEIGHT * index, 0],
                extrapolate: Extrapolate.CLAMP,
              }),
              extraTranslationY,
            );
            const scale = interpolate(positionY, {
              inputRange: [isDisappering, isOnTop, isOnBottom, isAppering],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });
            const opacity = interpolate(positionY, {
              inputRange: [isDisappering, isOnTop, isOnBottom, isAppering],
              outputRange: [0.5, 1, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {opacity, transform: [{translateY}, {scale}]},
                ]}>
                <Card {...{card}} />
              </Animated.View>
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  card: {
    marginVertical: MARGIN,
  },
});

export default App;
