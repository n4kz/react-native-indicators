import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Platform } from 'react-native';
import {
  DotIndicator,
  BarIndicator,
  BallIndicator,
  WaveIndicator,
  UIActivityIndicator
} from 'react-native-indicators';

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#263238'),
})();

export default function init() {
  class Example extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                size={20}
                color='#1976D2'
                animationDuration={800}
              />
            </View>
            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                size={20}
                color='#303F9F'
                animationDuration={800}
                animationDirection='backward'
              />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <BallIndicator color='#33691E' animationDuration={800} size={60} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <WaveIndicator color='#0097A7' />
            </View>

            <View style={{ flex: 1 }}>
              <WaveIndicator color='#0097A7' waveMode='outline' />
            </View>

            <View style={{ flex: 1 }}>
              <WaveIndicator color='#0097A7' count={2} waveFactor={0.4} />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <UIActivityIndicator color='#D32F2F' />
            </View>

            <View style={{ flex: 1 }}>
              <UIActivityIndicator color='#D32F2F' animationDirection='backward' />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <BarIndicator color='#FF6F00' count={5} />
            </View>
          </View>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}
