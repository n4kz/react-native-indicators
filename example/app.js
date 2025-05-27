import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Platform, ScrollView, Text } from 'react-native';
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

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#01579B" />

      <Text style={styles.title}>React Native Indicators</Text>
      <Text style={styles.subtitle}>Expo SDK 53 Demo</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>Ball Indicator</Text>
            <BallIndicator color='white' animationDuration={800} />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Pulse Indicator</Text>
            <PulseIndicator color='white' />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Skype Indicator</Text>
            <SkypeIndicator color='white' />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>Wave Indicator</Text>
            <WaveIndicator color='white' />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Wave Outline</Text>
            <WaveIndicator color='white' waveMode='outline' />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Wave Custom</Text>
            <WaveIndicator color='white' count={2} waveFactor={0.4} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>UI Activity</Text>
            <UIActivityIndicator color='white' />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Material</Text>
            <MaterialIndicator color='white' />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Pacman</Text>
            <PacmanIndicator color='white' />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>Bar Indicator</Text>
            <BarIndicator color='white' count={5} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>Dot Indicator</Text>
            <DotIndicator
              count={3}
              color='white'
              animationDuration={800}
            />
          </View>

          <View style={styles.flex}>
            <Text style={styles.label}>Dot Reversed</Text>
            <DotIndicator
              style={styles.reverse}
              count={3}
              color='white'
              animationDuration={800}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#01579B',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },

  scrollContent: {
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 30,
    minHeight: 80,
  },

  reverse: {
    transform: [{
      rotate: '180deg',
    }],
  },

  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    color: 'white',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
};
