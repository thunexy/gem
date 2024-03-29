import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  // android: StatusBar.currentHeight,
  default: 0,
});

export default function StatusBarBackground({style}) {
  const auth = useSelector(state => state.authentication);
  return (
    <View
      style={styles.statusBarBackground(
        auth?.isFirstTime ? '#6939FF' : style?.backgroundColor || '#CFBEFF',
      )}>
      <StatusBar
        backgroundColor={
          auth?.isFirstTime ? '#6939FF' : style?.backgroundColor || '#CFBEFF'
        }
        barStyle={
          auth?.isFirstTime
            ? 'light-content'
            : style?.barStyle || 'dark-content'
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  statusBarBackground: backgroundColor => ({
    height: StatusBarHeight,
    backgroundColor: backgroundColor,
  }),
});
