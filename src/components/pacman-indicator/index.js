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

    let style = {
      position: 'absolute',
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + (index - 2) * size / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor,
      transform: [{
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, size / (I18nManager.isRTL? 4 : -4)],
        }),
      }, {
        scale: count === index + 1?
          progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: [0, 1, 1],
          }):
          1,
      }],
    };

    if (count === index + 1) {
      style.opacity = progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: [0, 1, 1],
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

    let pacmanStyle = {
      position: 'absolute',

      top: size / 4,
      left: 0,
      width: size / 2,
      height: size / 2,

      transform: [{
        rotate: progress.interpolate({
          inputRange: [0, 0.67, 1],
          outputRange: (index ^ I18nManager.isRTL)?
            ['0deg',  '45deg', '0deg']:
            ['0deg', '-45deg', '0deg'],
        }),
      }],
    };

    let containerStyle = {
      width: size / 2,
      height: size / 4,
      overflow: 'hidden',
    };

    let style = {
      width: size / 2,
      height: size / 2,
      borderRadius: size / 4,
      backgroundColor,
    };

    if (index) {
      containerStyle.top = size / 4;
      style.top = -size / 4;
    }

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <View style={containerStyle} collapsable={false}>
          <Animated.View style={style} />
        </View>
      </Animated.View>
    );
  }

  render() {
    let { style, size, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width: size * 1.25, height: size }}
          renderComponent={this.renderComponent}
          {...props}
          count={5}
        />
      </View>
    );
  }
}
