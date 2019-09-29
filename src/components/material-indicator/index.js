import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';

import Indicator from '../indicator';
import styles from './styles';

export default class MaterialIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 4000,

    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  static propTypes = {
    ...Indicator.propTypes,

    trackWidth: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
  };

  _renderComponent = ({ index, count, progress }) => {
    let {
      size,
      color,
      trackWidth: borderWidth = size / 10,
      animationDuration,
    } = this.props;

    let frames = 60 * animationDuration / 1000;
    let easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

    let sa = 7.5;
    let ea = 30;

    let sequences = 3;
    let rotations = 5;

    let inputRange = Array
      .from(new Array(frames), (item, frameIndex) => frameIndex / (frames - 1));

    let outputRange = Array
      .from(new Array(frames), (item, frameIndex) => {
        let progress = 2 * sequences * frameIndex / (frames - 1);
        let rotation = index?
          +(360 - sa):
          -(180 - sa);

        let sequence = Math.ceil(progress);

        if (sequence % 2) {
          progress = progress - sequence + 1;
        } else {
          progress = sequence - progress;
        }

        let direction = index?
          -1:
          +1;

        return (direction * (180 - (sa + ea)) * easing(progress) + rotation) + 'deg';
      });

    let layerStyle = {
      width: size,
      height: size,
      transform: [{
        rotate: (90 - sa) + 'deg',
      }, {
        rotate: progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', (360 * rotations) + 'deg'],
        }),
      }],
    };

    let viewportStyle = {
      width: size,
      height: size,
      transform: [{
        translateY: index?
          -size / 2:
          0,
      }, {
        rotate: progress.interpolate({ inputRange, outputRange }),
      }],
    };

    let containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    };

    let offsetStyle = index?
      { top: size / 2 }:
      null;

    let lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size / 2,
      borderWidth,
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={layerStyle}>
          <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  };

  render() {
    let { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this._renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}
