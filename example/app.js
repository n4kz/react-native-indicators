import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Platform } from 'react-native';
import { DotIndicator } from 'react-native-indicators';

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
              <DotIndicator color='#7B1FA2' />
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                color='#1976D2'
                animationDuration={800}
              />
            </View>
            <View style={{ flex: 1 }}>
              <DotIndicator
                count={3}
                color='#303F9F'
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
