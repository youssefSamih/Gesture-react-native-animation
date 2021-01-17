import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Text from './Text';

interface ButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}
const fonts = {
  'SFProText-Semibold': require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
};
const Button = ({primary, onPress, label}: ButtonProps) => {
  const color = primary ? 'white' : undefined;
  const backgroundColor = primary ? '#3884ff' : undefined;
  return (
    <RectButton onPress={onPress}>
      <SafeAreaView style={{backgroundColor}} accessible>
        <View style={styles.container}>
          <Text
            style={[
              styles.label,
              {color, fontFamily: fonts['SFProText-Semibold']},
            ]}>
            {label}
          </Text>
        </View>
      </SafeAreaView>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    textAlign: 'center',
  },
});

export default Button;
