import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Platform } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#01579B'),
})();

export default function init() {
  class Example extends Component {
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.flex}>
              <BallIndicator color='white' animationDuration={800} />
            </View>

            <View style={styles.flex}>
              <PulseIndicator color='white' />
            </View>

            <View style={styles.flex}>
              <SkypeIndicator color='white' />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <WaveIndicator color='white' />
            </View>

            <View style={styles.flex}>
              <WaveIndicator color='white' waveMode='outline' />
            </View>

            <View style={styles.flex}>
              <WaveIndicator color='white' count={2} waveFactor={0.4} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <UIActivityIndicator color='white' />
            </View>

            <View style={styles.flex}>
              <MaterialIndicator color='white' />
            </View>

            <View style={styles.flex}>
              <PacmanIndicator color='white' />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <BarIndicator color='white' count={5} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flex}>
              <DotIndicator
                count={3}
                color='white'
                animationDuration={800}
              />
            </View>

            <View style={styles.flex}>
              <DotIndicator
                style={styles.reverse}
                count={3}
                color='white'
                animationDuration={800}
              />
            </View>
          </View>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#01579B',
    padding: 20,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  reverse: {
    transform: [{
      rotate: '180deg',
    }],
  },

  flex: {
    flex: 1,
  },
};
