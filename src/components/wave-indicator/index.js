import React, { PureComponent, PropTypes } from 'react';
import { View, Animated, Easing } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class WaveIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,

    count: 4,
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

  renderComponent({ index, count, opacity, progress }) {
    let { color: backgroundColor } = this.props;

    let waveStyle = {
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [0, 1 - 0.54 ** index, 1],
          outputRange: [0, 0, 1],
        }),
      }],
      opacity: progress.interpolate({
        inputRange: [0, 1 - 0.54 ** index, 1],
        outputRange: [1, 1, 0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={[styles.wave, waveStyle]} />
      </Animated.View>
    );
  }

  render() {
    let { style, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={styles.indicator}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
