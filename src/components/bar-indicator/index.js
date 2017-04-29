import React, { PureComponent, PropTypes } from 'react';
import { View, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class BarIndicator extends PureComponent {
  static defaultProps = {
    count: 3,
    color: 'rgb(0, 0, 0)',
  };

  static propTypes = {
    ...Indicator.propTypes,

    count: PropTypes.number,
    color: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  outputRange(base, index, count, samples) {
    let range = Array.from(new Array(samples), (undefined, index) => {
      return base * Math.abs(Math.cos(Math.PI * index / (samples - 1)));
    });

    for (let j = 0; j < index * (samples / count); j++) {
      range.unshift(range.pop());
    }

    range.unshift(...range.slice(-1));

    return range;
  }

  renderComponent({ index, count, progress }) {
    let { color: backgroundColor, animationDuration } = this.props;

    let frames = 60 * animationDuration / 1000;
    let samples = 0;

    do
      samples += count;
    while (samples < frames);

    let inputRange = Array
      .from(new Array(samples + 1), (undefined, index) => index / samples);

    let styleA = {
      backgroundColor,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(+8, index, count, samples),
        }),
      }],
    };

    let styleB = {
      backgroundColor,
      transform: [{
        translateY: progress.interpolate({
          inputRange,
          outputRange: this.outputRange(-8, index, count, samples),
        }),
      }],
    };

    return (
      <View style={styles.indicatorContainer} {...{ key: index }}>
        <Animated.View style={[styles.indicatorA, styleA]} />
        <Animated.View style={[styles.indicatorB, styleB]} />
      </View>
    );
  }

  render() {
    let { style, ...props } = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}
