import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class DotIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),

    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 16,
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }) {
    let { size, color: backgroundColor } = this.props;

    let style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
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
      <Animated.View style={style} {...{ key: index }} />
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
