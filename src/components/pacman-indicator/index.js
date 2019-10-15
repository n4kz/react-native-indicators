import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, I18nManager } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class PacmanIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 600,

    color: 'rgb(0, 0, 0)',
    size: 48,
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

  renderBlock({ index, count, progress }) {
    let { size, color: backgroundColor } = this.props;

    let transform = [{
      translateX: progress.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0, size / (I18nManager.isRTL? 4 : -4)],
        extrapolate: 'clamp',
      }),
    }];

    let style = {
      position: 'absolute',
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + (index - 2) * size / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform,
    };

    if (index === count - 1) {
      transform.push({
        scale: progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      });

      style.opacity = progress.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
    }

    return (
      <Animated.View style={style} key={index} />
    );
  }

  renderComponent({ index, count, progress }) {
    let { size, color: backgroundColor } = this.props;

    if (index > 1) {
      return this.renderBlock({ index, count, progress });
    }

    let hf = size / 2;
    let qr = size / 4;

    let pacmanStyle = {
      position: 'absolute',
      top: qr,
      left: 0,

      width: hf,
      height: hf,

      transform: [{
        rotate: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: (index ^ I18nManager.isRTL)?
            ['0deg',  '45deg', '0deg']:
            ['0deg', '-45deg', '0deg'],
          extrapolate: 'clamp',
        }),
      }],
    };

    let containerStyle = {
      overflow: 'hidden',

      width: hf,
      height: qr,

      ...(index? {
        top: qr,
        borderBottomLeftRadius: qr,
        borderBottomRightRadius: qr,
      } : {
        borderTopLeftRadius: qr,
        borderTopRightRadius: qr,
      }),

      backgroundColor,
    };

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <Animated.View style={containerStyle} />
      </Animated.View>
    );
  }

  render() {
    let { style, size, ...props } = this.props;

    let indicatorStyle = {
      width: size * 1.25,
      height: size,
    };

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={indicatorStyle}
          renderComponent={this.renderComponent}
          {...props}
          count={5}
        />
      </View>
    );
  }
}
