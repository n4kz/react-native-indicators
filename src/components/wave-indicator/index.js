import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

const floatEpsilon = Math.pow(2, -23);

export default class WaveIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),
    animationDuration: 1600,

    waveFactor: 0.54,
    waveMode: 'fill',

    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 40,
  };

  static propTypes = {
    ...Indicator.propTypes,

    waveFactor: PropTypes.number,
    waveMode: PropTypes.oneOf(['fill', 'outline']),

    color: PropTypes.string,
    size: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }) {
    let { size, color, waveFactor, waveMode } = this.props;
    let fill = 'fill' === waveMode;

    let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);

    let waveStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderWidth: fill? 0 : Math.floor(size / 20),
      [fill? 'backgroundColor' : 'borderColor']: color,

      transform: [{
        scale: progress.interpolate({
          inputRange: [factor, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      }],

      opacity: progress.interpolate({
        inputRange: [0, factor, 1],
        outputRange: [0, 1, 0],
      }),
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={waveStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
