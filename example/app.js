import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Platform } from 'react-native';
import {
  DotIndicator,
  BarIndicator,
  BallIndicator,
  PulseIndicator,
  WaveIndicator,
  UIActivityIndicator,
} from 'react-native-indicators';

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#01579B'),
})();

export default function init() {
  class Example extends Component {
    render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#01579B', padding: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <BallIndicator color='white' animationDuration={800} />
            </View>

            <View style={{ flex: 1 }}>
              <PulseIndicator color='white' />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <WaveIndicator color='white' />
            </View>

            <View style={{ flex: 1 }}>
              <WaveIndicator color='white' waveMode='outline' />
            </View>

            <View style={{ flex: 1 }}>
              <WaveIndicator color='white' count={2} waveFactor={0.4} />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <UIActivityIndicator color='white' />
            </View>

            <View style={{ flex: 1 }}>
              <UIActivityIndicator color='white' animationDirection='backward' />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <BarIndicator color='white' count={5} />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                color='white'
                animationDuration={800}
              />
            </View>

            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                color='white'
                animationDuration={800}
                animationDirection='backward'
              />
            </View>
          </View>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}
