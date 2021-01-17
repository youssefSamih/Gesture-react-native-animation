import React from 'react';
import type {TextProps as OriginalTextProps} from 'react-native';
import {Text as RNText} from 'react-native';

interface TextProps extends OriginalTextProps {
  dark?: boolean;
  children: React.ReactNode;
}

const Text = ({dark, style, children}: TextProps) => {
  const color = dark ? 'white' : 'black';
  return <RNText style={[{color}, style]}>{children}</RNText>;
};

export default Text;
