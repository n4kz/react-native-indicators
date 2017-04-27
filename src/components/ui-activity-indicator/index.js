import React, { PureComponent, PropTypes } from 'react';
import { View, Animated } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class UIActivityIndicator extends PureComponent {
  static defaultProps = {
    count: 12,
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
    let angle = index * 360 / count;

    let layerStyle = {
      opacity,
      transform: [{
        rotate: angle + 'deg',
      }],
    };

    let inputRange = Array
      .from(new Array(count + 1), (undefined, index) =>
        index / count
      );

    let outputRange = Array
      .from(new Array(count), (undefined, index) =>
        Math.max(1.0 - index * (1 / (count - 1)), 0)
      );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }

    outputRange.unshift(...outputRange.slice(-1));

    let barStyle = {
      backgroundColor,
      opacity: progress
        .interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} {...{ key: index }}>
        <Animated.View style={[styles.bar, barStyle]} />
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
