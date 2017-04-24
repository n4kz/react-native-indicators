import React, { PureComponent, PropTypes } from 'react';
import { Animated, Easing } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class DotIndicator extends PureComponent {
  static defaultProps = {
    count: 4,
    color: 'rgba(0, 0, 0, .2)',
    animationEasing: Easing.inOut(Easing.ease),
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

    let style = {
      opacity,
      backgroundColor,
      transform: [{
        scale: progress.interpolate({
          inputRange: [
            0.0,
            (index + 0.5) / (count + 1),
            (index + 1.0) / (count + 1),
            (index + 1.5) / (count + 1),
            1.0,
          ],
          outputRange: [
            1.0,
            1.36,
            1.56,
            1.06,
            1.0,
          ],
        }),
      }],
    };

    return (
      <Animated.View style={[styles.indicator, style]} {...{ key: index }} />
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
